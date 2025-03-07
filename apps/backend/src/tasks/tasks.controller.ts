import { Body, Controller, Get, HttpCode, HttpException, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { FindOpenTasksQuery, FindTasksQuery } from 'src/types/queries';
import {
  AnswerTaskResponse,
  FindOpenTasksResponse,
  FindTaskResponse,
} from "@repo/types";
import { AnswerTaskBody } from 'src/types/bodies';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService) { }

  @Get()
  @ApiOperation({ summary: 'Get task', description: 'Get task by year and task number' })
  @ApiResponse({ status: 200, description: 'Task found' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiQuery({ required: true, name: 'year', type: Number, description: 'Year of task release', example: 2025 })
  @ApiQuery({ required: true, name: 'task', type: Number, description: 'Task number', example: 1 })

  async findTasks(@Query() query: FindTasksQuery): Promise<FindTaskResponse> {
    return this.tasksService.findTasks(query);
  }

  @Get('/open')
  findOpenTasks(@Query() query: FindOpenTasksQuery): FindOpenTasksResponse {
    return this.tasksService.findOpenTasks(query);
  }

  @Post('/answer')
  answerTask(@Body() body: AnswerTaskBody): AnswerTaskResponse {
    return this.tasksService.answerTask(body);
  }
}
