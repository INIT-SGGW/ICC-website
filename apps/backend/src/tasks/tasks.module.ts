import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from '../schemas/task.schema.js';
import { UserSchema } from '../schemas/user.schema.js';
import { GuardsModule } from '../guards/guards.module.js';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }], 'icc'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }], 'register'),
    GuardsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
