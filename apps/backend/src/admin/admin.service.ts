import { Injectable } from '@nestjs/common';
import { CreateTaskDTO, TaskAdminDTO, UpdateTaskDTO } from '../types/dtos.js';
import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import { unzipFile } from '../utils/UnzipFile.js';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema.js';
import { Model, Types } from 'mongoose';
import { GetAllTasksResponse, GetTaskAdminResponse, GetTaskUserResponse } from '@repo/types';
import { GetAllTasksQuery } from '../types/queries.js';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Task.name, 'icc') private taskModel: Model<Task>,
  ) { }

  async getAllTasks(query: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const tasks = await this.taskModel.find({ releaseYear: query.year, semester: query.semester });
    if (tasks.length === 0) {
      throw new HttpException(`Brak zadań dla roku ${query.year} i semestru ${query.semester}`, StatusCodes.NOT_FOUND);
    }

    const today = new Date();

    return {
      tasks: tasks.map((task) => ({
        taskId: task._id.toString(),
        title: task.title,
        taskNumber: task.taskNumber,
        releaseDate: task.releaseDate,
        isOpen: task.releaseDate < today,
      })),
    };
  }

  async getTask(id: string): Promise<GetTaskAdminResponse> {
    try {
      const task = await this.taskModel.findById(new Types.ObjectId(id));

      if (!task) {
        throw new HttpException('Wyszukiwane zadanie nie istnieje', StatusCodes.NOT_FOUND);
      }

      return {
        title: task.title,
        taskNumber: task.taskNumber,
        releaseDate: task.releaseDate,
        semester: task.semester
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania zadania', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async createTask(body: CreateTaskDTO): Promise<void> {
    const realeaseYear = new Date(body.releaseDate).getFullYear();
    const savePath = `./uploads/${realeaseYear}/${body.semester}/${body.taskNumber}`;

    if (fs.existsSync(savePath)) {
      throw new HttpException('Zadanie o podanym roku wydania, semestrze i numerze już istnieje', StatusCodes.CONFLICT);
    }

    try {
      await unzipFile("./uploads/temp/inputs.zip", savePath);
    } catch (error: unknown) {
      throw new HttpException('Wystąpił błąd podczas rozpakowywania pliku', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    try {
      const task = new this.taskModel({
        title: body.title,
        releaseDate: body.releaseDate,
        semester: body.semester,
        taskNumber: body.taskNumber,
        content: {
          partA: body.partA,
          partB: body.partB,
        },
        filePath: savePath,
      });

      await task.save();
    } catch (error: unknown) {
      fs.rmSync(savePath, { recursive: true });
      throw new HttpException('Wystąpił błąd podczas zapisywania zadania w bazie danych', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    return;
  }

  async updateTask(id: string, body: UpdateTaskDTO): Promise<TaskAdminDTO> {
    try {
      const task = await this.taskModel.findById(new Types.ObjectId(id));

      if (!task) {
        throw new HttpException('Wyszukiwane zadanie nie istnieje', StatusCodes.NOT_FOUND);
      }

      task.title = body.title;
      task.releaseDate = body.releaseDate;
      task.semester = body.semester;
      task.taskNumber = body.taskNumber;
      task.content = {
        partA: body.partA ? body.partA : task.content.partA,
        partB: body.partB ? body.partB : task.content.partB,
      };

      const releaseYear = new Date(body.releaseDate).getFullYear();
      const newInputsPath = `./uploads/${releaseYear}/${task.semester}/${task.taskNumber}`;

      if (newInputsPath !== task.filePath && fs.existsSync(newInputsPath)) {
        // if task with the same year, semester and number already exists
        throw new HttpException('Zadanie o podanym roku wydania, semestrze i numerze już istnieje', StatusCodes.CONFLICT);
      }

      console.log(typeof body.answers !== "string", task.filePath !== newInputsPath);
      if (task.filePath !== newInputsPath) {
        // if path has changed
        if (typeof body.answers === "string") {
          // copy to new location
          fs.cpSync(task.filePath, newInputsPath, { recursive: true });
        } else {
          // upload new file
          await unzipFile("./uploads/temp/inputs.zip", newInputsPath);
        }
        fs.rmSync(task.filePath, { recursive: true });
        task.filePath = newInputsPath;
      } else {
        // if path hasn't changed
        if (typeof body.answers !== "string") {
          // upload new file
          await unzipFile("./uploads/temp/inputs.zip", task.filePath);
        }
      }

      await task.save();

      return {
        title: task.title,
        taskNumber: task.taskNumber,
        releaseDate: task.releaseDate,
        semester: task.semester
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas aktualizacji zadania', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const task = await this.taskModel.findById(new Types.ObjectId(id));

      if (!task) {
        throw new HttpException('Wyszukiwane zadanie nie istnieje', StatusCodes.NOT_FOUND);
      }

      await task.deleteOne();

      const inputsPath = task.filePath;
      fs.rmSync(inputsPath, { recursive: true });
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas usuwania zadania', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
