import fs from 'node:fs';
import { Injectable, HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import type { GetAllAdminsResponse, GetAllTasksResponse, GetAllUsersResponse, GetSingleAdminResponse, GetTaskAdminResponse, UpdateAdminRequest } from '@repo/types';
import { Task } from '../schemas/task.schema.js';
import type { CreateTaskDTO, GetUserDTO, TaskAdminDTO, UpdateTaskDTO, UserTokenDataDTO } from '../types/dtos.js';
import { unzipFile } from '../utils/UnzipFile.js';
import type { GetAllTasksQuery } from '../types/queries.js';
import { Admin } from '../schemas/admin.schema.js';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Task.name, 'icc') private taskModel: Model<Task>,
    @InjectModel(Admin.name, 'register') private adminModel: Model<Admin>,
  ) { }

  async getUser(user: UserTokenDataDTO | undefined): Promise<GetUserDTO> {
    try {
      if (!user) {
        throw new HttpException('Brak użytkownika', StatusCodes.BAD_REQUEST);
      }

      const { id } = user;

      if (!id) {
        throw new HttpException('Brak id użytkownika', StatusCodes.BAD_REQUEST);
      }

      const userDoc = await this.adminModel.findById(new Types.ObjectId(id));

      if (!userDoc) {
        throw new HttpException('Wyszukiwany użytkownik nie istnieje', StatusCodes.NOT_FOUND);
      }

      return {
        email: userDoc.email,
        firstName: userDoc.first_name,
        lastName: userDoc.last_name,
        userId: userDoc._id.toString(),
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania użytkownika', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllAdmins(): Promise<GetAllAdminsResponse> {
    try {
      const admins = await this.adminModel.find().lean();

      return {
        admins: admins.map((admin) => ({
          userId: admin._id.toString(),
          email: admin.email,
          firstName: admin.first_name,
          lastName: admin.last_name,
          discordUsername: admin.discord_username,
        })),
      };
    } catch (error: unknown) {
      throw new HttpException('Wystąpił błąd podczas pobierania administratorów', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getSingleAdmin(id: string): Promise<GetSingleAdminResponse> {
    try {
      const admin = await this.adminModel.findById(new Types.ObjectId(id)).lean();

      if (!admin) {
        throw new HttpException('Wyszukiwany administrator nie istnieje', StatusCodes.NOT_FOUND);
      }

      return {
        userId: admin._id.toString(),
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
        discordUsername: admin.discord_username,
      };
    } catch (error: unknown) {
      throw new HttpException('Wystąpił błąd podczas pobierania administratorów', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAdmin(id: string, body: UpdateAdminRequest): Promise<void> {
    try {
      await this.adminModel.updateOne({ _id: new Types.ObjectId(id) }, {
        email: body.email,
        first_name: body.firstName,
        last_name: body.lastName,
        discord_username: body.discordUsername,
      });
    } catch (error: unknown) {
      throw new HttpException('Wystąpił błąd podczas aktualizacji administratora', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAdmin(id: string): Promise<void> {
    try {
      await this.adminModel.deleteOne({ _id: new Types.ObjectId(id) });
    } catch (error: unknown) {
      throw new HttpException('Wystąpił błąd podczas usuwania administratora', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllTasks(query: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const tasks = await this.taskModel.find({ releaseYear: query.year, semester: query.semester });

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
        semester: task.semester,
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

    unzipFile('./uploads/temp/inputs.zip', savePath);

    try {
      await this.taskModel.create({
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
    } catch (error: unknown) {
      fs.rmSync(savePath, { recursive: true });
      throw new HttpException(
        'Wystąpił błąd podczas zapisywania zadania w bazie danych',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
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
        throw new HttpException(
          'Zadanie o podanym roku wydania, semestrze i numerze już istnieje',
          StatusCodes.CONFLICT,
        );
      }

      if (task.filePath !== newInputsPath) {
        // if path has changed
        if (typeof body.answers === 'string') {
          // copy to new location
          fs.cpSync(task.filePath, newInputsPath, { recursive: true });
        } else {
          // upload new file
          unzipFile('./uploads/temp/inputs.zip', newInputsPath);
        }
        fs.rmSync(task.filePath, { recursive: true });
        task.filePath = newInputsPath;
      } else {
        // if path hasn't changed
        if (typeof body.answers !== 'string') {
          // upload new file
          unzipFile('./uploads/temp/inputs.zip', task.filePath);
        }
      }

      await task.save();

      return {
        title: task.title,
        taskNumber: task.taskNumber,
        releaseDate: task.releaseDate,
        semester: task.semester,
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
