import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema.js';
import { Task, TaskSchema } from '../schemas/task.schema.js';
import { GuardsModule } from '../guards/guards.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'register'),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }], 'icc'),
    GuardsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
