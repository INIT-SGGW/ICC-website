import { HttpException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import type { GetAllUsersResponse, GetSingleUserResponse, GetUserStatsResponse } from '@repo/types';
import { StatusCodes } from 'http-status-codes';
import type { User } from '../schemas/user.schema.js';
import type { UpdateUserDTO, UserTokenDataDTO } from '../types/dtos.js';
import type { Task } from '../schemas/task.schema.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User', 'register') private userModel: Model<User>,
    @InjectModel('Task', 'icc') private taskModel: Model<Task>,
  ) {}

  async getAllUsers(): Promise<GetAllUsersResponse> {
    try {
      const users = await this.userModel.find();

      if (users.length === 0) {
        throw new HttpException('Brak użytkowników', 404);
      }

      return {
        users: users.map((user) => ({
          userId: user._id.toString(),
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.emails[0],
        })),
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania użytkowników', 500);
    }
  }

  async getSingleUser(id: string): Promise<GetSingleUserResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Nie znaleziono użytkownika', StatusCodes.NOT_FOUND);
      }

      const user = await this.userModel.findById(id);

      if (!user) {
        throw new HttpException('Nie znaleziono użytkownika', StatusCodes.NOT_FOUND);
      }

      return {
        userId: user._id.toString(),
        firstName: user.first_name,
        lastName: user.last_name,
        emails: user.emails,
        academicYear: user.academic_year,
        faculty: user.faculity,
        degree: user.degree,
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania użytkownika', 500);
    }
  }

  async updateAdmin(id: string, body: UpdateUserDTO): Promise<void> {
    try {
      await this.userModel.updateOne(
        { _id: id },
        {
          first_name: body.firstName,
          last_name: body.lastName,
          emails: body.emails,
          academic_year: body.academicYear,
          faculity: body.faculty,
          degree: body.degree,
        },
      );
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas aktualizacji użytkownika', 500);
    }
  }

  async deleteAdmin(id: string): Promise<void> {
    try {
      await this.userModel.deleteOne({ _id: id });
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas usuwania użytkownika', 500);
    }
  }

  async getUserStats(userDTO: UserTokenDataDTO | undefined): Promise<GetUserStatsResponse> {
    try {
      if (!userDTO) {
        throw new HttpException('Nie masz dostępu do zasobu', StatusCodes.UNAUTHORIZED);
      }

      const { id } = userDTO;

      if (!id || !Types.ObjectId.isValid(id)) {
        throw new HttpException('Nie masz dostępu do zasobu', StatusCodes.UNAUTHORIZED);
      }

      const user = await this.userModel.findById(id).lean();

      if (!user) {
        throw new HttpException(`Nie znaleziono użytkownika o id ${id}`, StatusCodes.NOT_FOUND);
      }

      //eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user.started_tasks is always defined
      if (!user.started_tasks) {
        return {
          pointsGeneral: user.pointsGeneral || 0,
          pointsTask: Array.from({ length: 12 }, () => 0),
          rankingPosition: 0,
        };
      }
      const tasks = await this.taskModel
        .find({ _id: { $in: user.started_tasks.map((t) => t.task_id) } })
        .select('taskNumber')
        .lean();

      const pointsTaskArray = Array.from({ length: 12 }, (_, i) => {
        const task = tasks.find((t) => t.taskNumber === i + 1);
        if (!task) {
          return 0;
        }
        const taskIndex = user.started_tasks.findIndex((t) => t.task_id.toString() === task._id.toString());
        return user.started_tasks[taskIndex].partA.points + user.started_tasks[taskIndex].partB.points;
      });
      const rankingPosition = await this.userModel.countDocuments({ pointsGeneral: { $gt: user.pointsGeneral } });

      return {
        pointsGeneral: user.pointsGeneral,
        pointsTask: pointsTaskArray,
        rankingPosition: rankingPosition + 1,
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Wystąpił błąd podczas pobierania statystyk', 500);
    }
  }

  // createUser(body: CreateUserDTO): string {
  //   return 'This action adds a new user';
  // }

  // getOneUser(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // updateUser(id: number, body: UpdateUserDTO) {
  //   return `This action updates a #${id} user`;
  // }

  // deleteUser(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
