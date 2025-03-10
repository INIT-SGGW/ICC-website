import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import type { GetAllUsersResponse } from '@repo/types';
import { User } from '../schemas/user.schema.js';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'register') private userModel: Model<User>) {}

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
