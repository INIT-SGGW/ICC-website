import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Faculty, Ranking, type GetRankingResponse } from '@repo/types';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema.js';
import { Task } from '../schemas/task.schema.js';
import { GetRankingQuery } from '../types/queries.js';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Task.name, 'icc') private taskModel: Model<Task>,
    @InjectModel(User.name, 'register') private userModel: Model<User>,
  ) { }

  async getRanking(query: GetRankingQuery): Promise<GetRankingResponse> {
    try {
      let generalRanking = (await this.userModel.find().sort({ pointsGeneral: -1 }).limit(50).lean()).map((user) => ({
        firstName: user.first_name,
        lastName: user.last_name,
        points: user.pointsGeneral,
        indexNumber: user.student_index,
        faculty: user.faculity,
        year: user.academic_year
      }));

      if (query.faculty) {
        generalRanking = generalRanking.filter((user) => user.faculty === query.faculty);
      }

      if (query.year) {
        generalRanking = generalRanking.filter((user) => user.year === query.year);
      }

      const finalRanking: Ranking = generalRanking.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        points: user.points,
        indexNumber: user.indexNumber,
      }));

      return {
        general: finalRanking,
        perTask: Array.from({ length: 5 }, () => finalRanking),
      };
    } catch (error: unknown) {
      console.error(error);
      throw new HttpException('Wystąpił błąd podczas pobierania rankingu', 500);
    }
  }
}
