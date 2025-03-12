import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../schemas/task.schema.js';
import { Admin, AdminSchema } from '../schemas/admin.schema.js';
import { GuardsModule } from '../guards/guards.module.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }], 'icc'),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }], 'register'),
    GuardsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
