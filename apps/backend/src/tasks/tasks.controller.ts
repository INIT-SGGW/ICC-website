import { Body, Controller, Get, HttpCode, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Semester, TaskParts } from '@repo/types';
import { Request as Req } from 'express';
import { GetAllTasksQuery } from '../types/queries.js';
import { AnswerTaskBody } from '../types/bodies.js';
import { BPartAuthGuard, UserAuthGuard } from '../auth/auth.guard.js';
import {
  GetTaskAnswersResponseDTO,
  TasksDTO,
  ServerErrorDTO,
  TaskDTO,
  GetNextTaskDTO,
  SendAnswerTaskResponseDTO,
} from '../types/dtos.js';
import { TasksService } from './tasks.service.js';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks for user', description: 'Get all tasks for user in given year' })
  @ApiResponse({ status: 200, description: "Returns description of task's part A and part B", type: TasksDTO })
  @ApiResponse({ status: 404, description: 'No tasks in that year', type: ServerErrorDTO })
  @ApiQuery({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  @ApiQuery({ required: true, name: 'semester', type: String, description: 'Semester of task release', example: 2025 })
  async getAllTasks(@Query() query: GetAllTasksQuery): Promise<TasksDTO> {
    return this.tasksService.getAllTasks(query);
  }

  @Get('/next')
  @ApiOperation({ summary: 'Get next task', description: 'Get next task for user' })
  @ApiResponse({ status: 200, description: "Returns description of task's part A and part B", type: GetNextTaskDTO })
  @ApiResponse({ status: 404, description: 'No tasks in that year', type: ServerErrorDTO })
  @ApiQuery({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  @ApiQuery({
    required: true,
    name: 'semester',
    type: String,
    description: 'Semester of task release',
    example: 'letni',
  })
  async getNextTask(@Query() query: GetAllTasksQuery): Promise<GetNextTaskDTO> {
    return this.tasksService.getNextTask(query);
  }

  @Get('/:year/:semester/:taskNumber/:part')
  @UseGuards(BPartAuthGuard)
  @ApiOperation({ summary: 'Get open tasks', description: 'Get list of open tasks' })
  @ApiResponse({ status: 200, description: 'Returns list of open tasks', type: TaskDTO })
  @ApiParam({ required: true, name: 'task', type: Number, description: 'Task number', example: 1 })
  @ApiParam({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  @ApiParam({
    required: true,
    name: 'semester',
    type: String,
    description: 'Semester of task release',
    example: 'letni',
  })
  async getTaskUser(
    @Param('year') year: string,
    @Param('semester') semester: Semester,
    @Param('taskNumber') taskNumber: string,
    @Param('part') part: TaskParts,
    @Request() req: Req,
  ): Promise<TaskDTO> {
    return this.tasksService.getTaskUser(Number(year), semester, Number(taskNumber), part, req);
  }

  @Get('/:year/:semester/:taskNumber/:part/answer')
  @UseGuards(UserAuthGuard, BPartAuthGuard)
  @ApiOperation({ summary: 'Get open tasks', description: 'Get list of open tasks' })
  @ApiResponse({ status: 200, description: 'Returns list of open tasks', type: GetTaskAnswersResponseDTO })
  @ApiParam({ required: true, name: 'taskNumber', type: Number, description: 'Task number', example: 1 })
  @ApiParam({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  @ApiParam({
    required: true,
    name: 'semester',
    type: String,
    description: 'Semester of task release',
    example: 'letni',
  })
  @ApiParam({ required: true, name: 'part', type: String, description: 'Task part', example: 'A' })
  async getTaskAnswersUser(
    @Param('year') year: string,
    @Param('semester') semester: Semester,
    @Param('taskNumber') taskNumber: string,
    @Param('part') part: TaskParts,
    @Request() { user }: Req,
  ): Promise<GetTaskAnswersResponseDTO> {
    return this.tasksService.getTaskAnswersUser(Number(year), semester, Number(taskNumber), user, part);
  }

  @Post('/:year/:semester/:taskNumber/:part/answer')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Answer task', description: 'Send answer to a task' })
  @ApiParam({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  @ApiQuery({
    required: true,
    name: 'semester',
    type: String,
    description: 'Semester of task release',
    example: 'letni',
  })
  @HttpCode(200)
  @ApiParam({ required: true, name: 'taskNumber', type: Number, description: 'Task number', example: 1 })
  @ApiParam({ required: true, name: 'part', type: String, description: 'Task part', example: 'A' })
  @ApiBody({ type: AnswerTaskBody })
  @ApiResponse({
    status: 200,
    description: 'Returns information about correctness of answer',
    type: SendAnswerTaskResponseDTO,
  })
  async answerTask(
    @Param('year') year: string,
    @Param('semester') semester: Semester,
    @Param('taskNumber') taskNumber: string,
    @Param('part') part: TaskParts,
    @Body() body: AnswerTaskBody,
    @Request() { user }: Req,
  ): Promise<SendAnswerTaskResponseDTO> {
    return this.tasksService.answerTask(Number(year), semester, Number(taskNumber), part, user, body);
  }
}
