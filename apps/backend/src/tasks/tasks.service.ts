import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnswerTaskResponse,
  FindOpenTasksResponse,
  FindTaskResponse as FindTasksResponse,
} from '@repo/types';
import { AnswerTaskBody } from 'src/types/bodies';
import { FindOpenTasksQuery, FindTasksQuery } from 'src/types/queries';
import { Task, TaskSchema as TasSchema } from "../schemas/task.schema";
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async findTasks(query: FindTasksQuery): Promise<FindTasksResponse> {
    const user = await this.userModel.findOne({ first_name: "John" });
    console.log(user);
    return {
      task: 'Task 1',
    };
  }

  findOpenTasks(query: FindOpenTasksQuery): FindOpenTasksResponse {
    return {
      tasks: [
        {
          taskId: 1,
          isOpen: true,
        },
      ],
    };
  }

  answerTask(body: AnswerTaskBody): AnswerTaskResponse {
    return {
      isCorrect: true,
      previousAnswers: [
        {
          date: new Date(),
          answer: 'answer',
        },
      ],
      correctAnswer: 'answer',
      cooldown: 0,
      points: 10,
    };
  }
}
