import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { GetRankingResponse } from '@repo/types';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema.js';
import { Task } from '../schemas/task.schema.js';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Task.name, 'icc') private taskModel: Model<Task>,
    @InjectModel(User.name, 'register') private userModel: Model<User>,
  ) {}

  async getRanking(): Promise<GetRankingResponse> {
    try {
      const generalRanking = (await this.userModel.find().sort({ pointsGeneral: -1 }).limit(50).lean()).map((user) => ({
        firstName: user.first_name,
        lastName: user.last_name,
        points: user.pointsGeneral,
        indexNumber: user.student_index,
      }));

      // const generalRanking = [{
      //   firstName: 'firstName',
      //   lastName: 'lastName',
      //   points: 0,
      //   indexNumber: 0,
      // }]

      // const tasks = await this.taskModel.findOne({ taskNumber: 1 })
      //   .populate({
      //     path: "usersFinished.partA.userId",
      //     model: "User",
      //   })
      //   .lean();
      // console.log(tasks?.usersFinished);

      return {
        general: generalRanking,
        perTask: Array.from({ length: 5 }, () => generalRanking),
      };
    } catch (error: unknown) {
      console.error(error);
      throw new HttpException('Wystąpił błąd podczas pobierania rankingu', 500);
    }
  }
}
