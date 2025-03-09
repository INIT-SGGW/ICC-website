import { HttpException, Injectable } from '@nestjs/common';
import type { CreateUserDTO, GetAllUsersDTO, UpdateUserDTO } from '../types/dtos.js';
import { User } from '../schemas/user.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetAllUsersResponse } from '@repo/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'register') private userModel: Model<User>
  ) { }

  createUser(body: CreateUserDTO) {
    return 'This action adds a new user';
  }

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
      throw new HttpException("Wystąpił błąd podczas pobierania użytkowników", 500);
    }
  }

  getOneUser(id: number) {
    return `This action returns a #${id} user`;
  }

  updateUser(id: number, body: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  deleteUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
