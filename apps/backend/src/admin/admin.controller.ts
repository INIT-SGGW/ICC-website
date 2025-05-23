import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StatusCodes } from 'http-status-codes';
import { UpdateAdminRequest } from '@repo/types';
import {
  CreateTaskDTO,
  ServerErrorDTO,
  TaskAdminDTO,
  UpdateTaskDTO,
  TasksDTO,
  GetAllAdminsDTO,
  AdminPayloadDTO,
} from '../types/dtos.js';
import { GetAllTasksQuery } from '../types/queries.js';
import { AdminAuthGuard } from '../guards/admin.guard.js';
import { AdminService } from './admin.service.js';

@Controller('/admin')
@ApiTags('admin')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('admin/')
  @ApiOperation({ summary: 'Get all admins', description: 'Get all registered admins' })
  @ApiResponse({ status: 200, description: 'Returns admin', type: GetAllAdminsDTO })
  async getAllAdmins(): Promise<GetAllAdminsDTO> {
    return this.adminService.getAllAdmins();
  }

  @Get('/admin/:id')
  @ApiOperation({ summary: 'Get single admin', description: 'Get admin data by id' })
  @ApiResponse({ status: 200, description: 'Returns admin', type: AdminPayloadDTO })
  @ApiParam({ required: true, name: 'id', type: String, description: 'Admin id', example: 'as64c32647c1234c3421' })
  async getSingleAdmin(@Param('id') id: string): Promise<AdminPayloadDTO> {
    return this.adminService.getSingleAdmin(id);
  }

  @Patch('/admin/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({ summary: 'Get single admin', description: 'Update admin by id' })
  @ApiResponse({ status: 204, description: 'No content' })
  @ApiParam({ required: true, name: 'id', type: String, description: 'Admin id', example: 'as64c32647c1234c3421' })
  async updateAdmin(@Param('id') id: string, @Body() body: UpdateAdminRequest): Promise<void> {
    return this.adminService.updateAdmin(id, body);
  }

  @Delete('/admin/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({ summary: 'Get user', description: 'Get user by id' })
  @ApiResponse({ status: StatusCodes.NO_CONTENT, description: 'No content' })
  @ApiParam({ required: true, name: 'id', type: String, description: 'Admin id', example: 'as64c32647c1234c3421' })
  async deleteAdmin(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteAdmin(id);
  }

  @Get('/tasks')
  @ApiOperation({ summary: 'Get all tasks for user', description: 'Get all tasks for user in given year' })
  @ApiResponse({ status: 200, description: "Returns description of task's part A and part B", type: TasksDTO })
  @ApiResponse({ status: 404, description: 'No tasks in that year', type: ServerErrorDTO })
  @ApiQuery({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  async getAllTasksAdmin(@Query() query: GetAllTasksQuery): Promise<TasksDTO> {
    return this.adminService.getAllTasks(query);
  }

  @Get('/tasks/:id')
  @ApiOperation({ summary: 'Get open tasks', description: 'Get list of open tasks' })
  @ApiResponse({ status: 200, description: 'Returns list of open tasks', type: TaskAdminDTO })
  @ApiQuery({ required: true, name: 'id', type: String, description: 'Task id', example: 'as64c32647c1234c3421' })
  async getTaskAdmin(@Param('id') id: string): Promise<TaskAdminDTO> {
    return this.adminService.getTask(id);
  }

  @Post('/tasks')
  @UseInterceptors(
    FileInterceptor('answers', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          cb(null, 'inputs.zip');
        },
      }),
    }),
  )
  @HttpCode(StatusCodes.CREATED)
  @ApiOperation({ summary: 'Create task', description: 'Create new task' })
  @ApiResponse({ status: 201, description: 'Task created' })
  async createTask(@Body() body: CreateTaskDTO): Promise<void> {
    return this.adminService.createTask(body);
  }

  @Patch('/tasks/{:id}')
  @UseInterceptors(
    FileInterceptor('answers', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          cb(null, 'inputs.zip');
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Update task', description: 'Update task by year and task number' })
  @ApiResponse({ status: 200, description: 'Task updated', type: TaskAdminDTO })
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDTO): Promise<TaskAdminDTO> {
    return this.adminService.updateTask(id, body);
  }

  @Delete('/tasks/{:id}')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({ summary: 'Delete task', description: 'Delete task by year and task number' })
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiResponse({ status: 404, description: 'Task not found', type: ServerErrorDTO })
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteTask(id);
  }
}
