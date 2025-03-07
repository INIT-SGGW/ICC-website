import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schemas/task.schema';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
