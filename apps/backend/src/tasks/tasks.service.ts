import fs from 'node:fs';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type {
  GetTaskAnswersResponse,
  GetAllTasksResponse,
  GetTaskUserResponse,
  GetNextTaskResponse,
  Semester,
  SendAnswerTaskResponse,
} from '@repo/types';
import { TaskParts } from '@repo/types';
import { Model, Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request } from 'express';
import { TaskFileDTO, type UserTokenDataDTO } from '../types/dtos.js';
import type { AnswerTaskBody } from '../types/bodies.js';
import type { GetAllTasksQuery } from '../types/queries.js';
import type { Task } from '../schemas/task.schema.js';
import type { User } from '../schemas/user.schema.js';
import { getRandomFile } from '../utils/GetRandomFile.js';
import { pointCounter } from '../utils/PointCounter.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task', 'icc') private taskModel: Model<Task>,
    @InjectModel('User', 'register') private userModel: Model<User>,
  ) {}

  async getAllTasks(query: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const tasks = await this.taskModel.find({ releaseYear: query.year, semester: query.semester });

    const today = new Date();

    const fakeTasks = Array.from({ length: 12 }, (_, i) => ({
      _id: i.toString(),
      title: 'title',
      taskNumber: i + 1,
      releaseDate: new Date('2040-01-01'),
      isOpen: false,
    }));

    const tasksArray = fakeTasks.map((task) => {
      const tempTask = tasks.find((t) => t.taskNumber === task.taskNumber);
      if (tempTask) {
        return {
          _id: tempTask._id,
          title: tempTask.title,
          taskNumber: tempTask.taskNumber,
          releaseDate: tempTask.releaseDate,
          isOpen: tempTask.releaseDate < today,
        };
      }
      return task;
    });

    return {
      tasks: tasksArray.map((task) => ({
        taskId: task._id.toString(),
        title: task.title,
        taskNumber: task.taskNumber,
        releaseDate: task.releaseDate,
        isOpen: task.releaseDate < today,
      })),
    };
  }

  async getNextTask(query: GetAllTasksQuery): Promise<GetNextTaskResponse> {
    try {
      const tasks = await this.taskModel
        .find({ releaseYear: query.year, semester: query.semester, releaseDate: { $gte: new Date() } })
        .sort({ releaseDate: 1 });

      if (tasks.length === 0) {
        throw new HttpException(`Brak następnych zadań`, StatusCodes.NOT_FOUND);
      }

      return {
        taskId: tasks[0]._id.toString(),
        releaseDate: tasks[0].releaseDate,
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania kolejnego zadania', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getTaskUser(
    year: number,
    semester: Semester,
    taskNumber: number,
    part: TaskParts,
    req: Request,
  ): Promise<GetTaskUserResponse> {
    const task = await this.taskModel.findOne({
      releaseYear: year,
      semester,
      taskNumber,
    });

    if (!task) {
      throw new HttpException('Wyszukiwane zadanie nie istnieje', StatusCodes.NOT_FOUND);
    }

    if (task.releaseDate > new Date()) {
      throw new HttpException(`Nie posiadasz dostępu do tego zadania`, StatusCodes.FORBIDDEN);
    }

    if (part === TaskParts.B && req.user) {
      const { id } = req.user;

      const user = await this.userModel.findById(new Types.ObjectId(id));
      if (!user) {
        throw new HttpException(`Nie znaleziono użytkownika o id ${id}`, StatusCodes.NOT_FOUND);
      }

      const currentTask = user.started_tasks.find((_task) => _task.task_id.equals(task._id));

      if (!currentTask) {
        throw new HttpException('Nie rozpocząłeś tego zadania', StatusCodes.NOT_FOUND);
      }

      if (!currentTask.partA.is_correct) {
        throw new HttpException('Nie masz dostępu do tej części zadania', StatusCodes.FORBIDDEN);
      }
    }

    const content = part === TaskParts.A ? task.content.partA : task.content.partB;

    return {
      content,
      releaseDate: task.releaseDate,
    };
  }

  async getTaskAnswersUser(
    year: number,
    semester: Semester,
    taskNumber: number,
    userDTO: UserTokenDataDTO | undefined,
    part: TaskParts,
  ): Promise<GetTaskAnswersResponse> {
    try {
      if (!userDTO) {
        throw new HttpException('Nie masz dostępu do zasobu', StatusCodes.UNAUTHORIZED);
      }

      const { id } = userDTO;

      if (!id || !Types.ObjectId.isValid(id)) {
        throw new HttpException('Nie masz dostępu do zasobu', StatusCodes.UNAUTHORIZED);
      }

      const user = await this.userModel.findById(new Types.ObjectId(id));
      if (!user) {
        throw new HttpException(`Nie znaleziono użytkownika o id ${id}`, StatusCodes.NOT_FOUND);
      }

      const task = await this.taskModel.findOne({
        releaseYear: year,
        semester,
        taskNumber,
      });

      if (!task) {
        throw new HttpException('Wyszukiwane zadanie nie istnieje', StatusCodes.NOT_FOUND);
      }

      if (task.releaseDate > new Date()) {
        throw new HttpException(
          `Zadanie otwiera się ${task.releaseDate.toLocaleString('pl-PL')}`,
          StatusCodes.FORBIDDEN,
        );
      }

      let currentTask = user.started_tasks.find((_task) => _task.task_id.equals(task._id));
      if (!currentTask) {
        // start task
        const taskFile = getRandomFile(`./uploads/${year}/${semester}/${taskNumber}`);
        if (!taskFile) {
          throw new HttpException('Problem z odczytaniem pliku', StatusCodes.UNAUTHORIZED);
        }

        const taskContent: unknown = JSON.parse(fs.readFileSync(taskFile, 'utf8'));
        const taskContentClass = plainToInstance<TaskFileDTO, unknown>(TaskFileDTO, taskContent);
        const transformError = await validate(taskContentClass);

        if (transformError.length > 0) {
          throw new HttpException('Błąd podczas walidacji pliku', StatusCodes.INTERNAL_SERVER_ERROR);
        }

        currentTask = {
          task_id: task._id,
          input_path: taskFile,
          seed: taskContentClass.seed,
          partA: {
            previous_answers: [],
            correct_answer: taskContentClass.part1,
            cooldown: new Date(),
            points: 0,
            is_correct: false,
          },
          partB: {
            previous_answers: [],
            correct_answer: taskContentClass.part2,
            cooldown: new Date(),
            points: 0,
            is_correct: false,
          },
        };
        user.started_tasks.push(currentTask);
        user.markModified('started_tasks');
        await user.save();
      }

      const partToCheck = part === TaskParts.A ? 'partA' : 'partB';
      const currentPart = currentTask[partToCheck];

      if (part === TaskParts.B && !currentTask.partA.is_correct) {
        throw new HttpException('Skończ część A, aby odblokować część B', StatusCodes.FORBIDDEN);
      }

      const input: unknown = JSON.parse(fs.readFileSync(currentTask.input_path, 'utf8'));
      const inputDTO = plainToInstance<TaskFileDTO, unknown>(TaskFileDTO, input);
      const transformError = await validate(inputDTO);
      if (transformError.length > 0) {
        throw new HttpException('Błąd podczas walidacji pliku', StatusCodes.INTERNAL_SERVER_ERROR);
      }

      if (currentPart.cooldown && currentPart.cooldown < new Date()) {
        // check if user has cooldown
        currentPart.cooldown = null;
        await this.userModel.updateOne(
          { _id: user._id },
          {
            $set: { [`started_tasks.$[elem].${partToCheck}.cooldown`]: null },
          },
          {
            arrayFilters: [{ 'elem.task_id': task._id }],
          },
        );
      }

      const sortedPreviousAnswers = currentPart.previous_answers.sort((a, b) => b.date.getTime() - a.date.getTime());

      return {
        isCorrect: currentPart.is_correct,
        input: inputDTO.input,
        cooldown: currentPart.cooldown,
        correctAnswer: currentPart.is_correct ? currentPart.correct_answer : undefined,
        points: currentPart.is_correct ? currentPart.points : undefined,
        previousAnswers: sortedPreviousAnswers,
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Wystąpił błąd podczas pobierania poprzednich odpowiedzi',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async answerTask(
    year: number,
    semester: Semester,
    taskNumber: number,
    part: TaskParts,
    userDTO: UserTokenDataDTO | undefined,
    body: AnswerTaskBody,
  ): Promise<SendAnswerTaskResponse> {
    try {
      if (!userDTO?.id || !Types.ObjectId.isValid(userDTO.id)) {
        throw new HttpException(
          'Nie masz dostępu do zasobu, aby wysłać odpowiedź musisz być zalogowany/a',
          StatusCodes.UNAUTHORIZED,
        );
      }
      const user = await this.userModel.findById(new Types.ObjectId(userDTO.id));

      if (!user) {
        throw new HttpException(`Nie znaleziono użytkownika o id ${userDTO.id}`, StatusCodes.NOT_FOUND);
      }

      const task = await this.taskModel.findOne({
        releaseYear: year,
        semester,
        taskNumber,
      });

      if (!task) {
        throw new HttpException('Zadanie, na które próbujesz odpowiedzieć, nie istnieje', StatusCodes.NOT_FOUND);
      }

      if (task.releaseDate > new Date()) {
        throw new HttpException(
          `Zadanie, na które próbujesz odpowiedzieć, otwiera się ${task.releaseDate.toUTCString()}`,
          StatusCodes.FORBIDDEN,
        );
      }

      const currentTask = user.started_tasks.find((_task) => _task.task_id.equals(task._id));

      if (!currentTask) {
        throw new HttpException(
          'Nie zarejestrowaliśmy rozpoczęcia przez ciebie zadania. Odśwież stronę',
          StatusCodes.NOT_FOUND,
        );
      }

      const partToUpdate = part === TaskParts.A ? 'partA' : 'partB';
      const currentPart = currentTask[partToUpdate];

      if (currentPart.is_correct) {
        // user already answered
        return {
          isCorrect: true,
          previousAnswers: currentPart.previous_answers,
          points: currentPart.points,
          correctAnswer: currentPart.correct_answer,
          cooldown: null,
        };
      }

      if (currentPart.cooldown && currentPart.cooldown > new Date()) {
        // check if user has cooldown
        return {
          isCorrect: false,
          previousAnswers: currentPart.previous_answers,
          cooldown: currentPart.cooldown,
        };
      }

      if (body.answer !== currentPart.correct_answer) {
        //user answered incorrectly
        const thirdToLast =
          currentPart.previous_answers.length >= 3
            ? currentPart.previous_answers[currentPart.previous_answers.length - 3]
            : null;

        const bufforTime = 1000 * 20; // 20s
        const penalty = 1000 * 8 * 1; // 1min

        // check if user answered 3 times in 20s
        if (thirdToLast && new Date().getTime() - thirdToLast.date.getTime() < bufforTime) {
          // if so add cooldown
          currentPart.cooldown = new Date(new Date().getTime() + penalty);
        } else {
          // if not add answer to previous answers
          currentPart.previous_answers.push({
            date: new Date(),
            answer: body.answer,
          });
          currentPart.cooldown = null;
        }
      } else {
        // user answered correctly
        currentPart.is_correct = true;
        currentPart.previous_answers.push({
          date: new Date(),
          answer: body.answer,
        });
        currentPart.points = pointCounter(task.usersFinished[partToUpdate].length);

        // add points to user; initialy users where created without property pointsGeneral
        await this.userModel.updateOne(
          { _id: user._id },
          {
            $inc: { pointsGeneral: currentPart.points },
          },
        );

        task.usersFinished[partToUpdate].push({ userId: user._id, finishedAt: new Date(), points: currentPart.points });
        task.markModified('usersFinished');
        await task.save();
      }

      // save changes
      await this.userModel.updateOne(
        { _id: user._id },
        {
          $set: { [`started_tasks.$[elem].${partToUpdate}`]: currentPart },
        },
        {
          arrayFilters: [{ 'elem.task_id': task._id }],
        },
      );

      return {
        isCorrect: currentPart.is_correct,
        previousAnswers: currentPart.previous_answers,
        cooldown: currentPart.cooldown,
        ...(currentPart.is_correct && {
          points: currentPart.points,
          correctAnswer: currentPart.correct_answer,
        }),
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania zadania', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
