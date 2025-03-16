import { ApiProperty } from '@nestjs/swagger';
import type {
  GetTaskAnswersResponse,
  GetAllTasksResponse,
  GetAllUsersResponse,
  GetTaskAdminResponse,
  GetTaskUserResponse,
  ServerError,
  SendAnswerTaskResponse,
  GetUserStatsResponse,
  GetRankingResponse,
  GetUserResponse,
  GetAllAdminsResponse,
  GetSingleAdminResponse,
} from '@repo/types';
import { Semester } from '@repo/types';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskUserDTO {
  @ApiProperty({
    type: String,
    example: '67c4d2f647bba3861dc871ed',
    description: 'Task ID',
  })
  taskId: string;

  @ApiProperty({
    type: String,
    example: 'Task title',
    description: 'Task title',
  })
  title: string;

  @ApiProperty({
    type: Number,
    example: 4,
    description: 'Task number in giver year',
  })
  taskNumber: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Task release date',
  })
  releaseDate: Date;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Flag showing if task is currently open',
  })
  isOpen: boolean;
}

export class TasksDTO implements GetAllTasksResponse {
  @ApiProperty({ type: [TaskUserDTO], description: 'List of open tasks' })
  tasks: TaskUserDTO[];
}

export class TaskDTO implements GetTaskUserResponse {
  @ApiProperty({
    type: String,
    example: 'Some text',
    description: 'First part of task in markdown',
  })
  content: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Task release date',
  })
  releaseDate: Date;
}

export class TaskAdminDTO implements GetTaskAdminResponse {
  @ApiProperty({ type: String, example: 'Task title', description: 'Task title' })
  title: string;

  @ApiProperty({
    type: Number,
    example: 4,
    description: 'Task number in giver year',
  })
  taskNumber: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Task release date',
  })
  releaseDate: Date;

  @ApiProperty({
    type: String,
    example: 'ZIMOWY',
    description: 'Task semester',
  })
  semester: Semester;
}

class ServerErrorErrorsList {
  @ApiProperty({ type: String, example: "Field 'firstName' cannot be empty", description: 'Error message ' })
  message: string;
}

export class ServerErrorDTO implements ServerError {
  @ApiProperty({
    type: String,
    example: 'Internal server error',
    description: 'Error title',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'Wystąpił błąd po stronie serwera',
    description: 'Status description',
  })
  status: string;

  @ApiProperty({
    type: String,
    example: 'Brak połączenia z bazą danych',
    description: 'Detailed error message',
  })
  detail: string;

  @ApiProperty({
    type: [ServerErrorErrorsList],
    description: 'List of errors, if there is more than one',
  })
  errors: ServerErrorErrorsList[];
}

class AnswerTaskResponsePreviousAnswers {
  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Date of answer',
  })
  date: Date;

  @ApiProperty({ type: String, example: 'INIT', description: 'Answer to task' })
  answer: string;
}

export class SendAnswerTaskResponseDTO implements SendAnswerTaskResponse {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Flag showing if answer is correct',
  })
  isCorrect: boolean;

  @ApiProperty({
    type: [AnswerTaskResponsePreviousAnswers],
    description: 'List of previous answers',
  })
  previousAnswers: AnswerTaskResponsePreviousAnswers[];

  @ApiProperty({ type: String, example: '123', description: 'Correct answer' })
  correctAnswer?: string;

  @ApiProperty({
    type: Date,
    nullable: true,
    example: new Date(),
    description: 'Cooldown time in seconds',
  })
  cooldown: Date | null;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Points gained',
  })
  points?: number;
}

export class GetTaskAnswersResponseDTO implements GetTaskAnswersResponse {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Flag showing if answer is correct',
  })
  isCorrect: boolean;

  @ApiProperty({
    type: [AnswerTaskResponsePreviousAnswers],
    description: 'List of previous answers',
  })
  previousAnswers: AnswerTaskResponsePreviousAnswers[];

  @ApiProperty({
    type: String,
    example: 'Some text',
    description: 'Input to the task',
  })
  input: string;

  @ApiProperty({
    type: Date,
    nullable: true,
    example: 30,
    description: 'Cooldown time in seconds',
  })
  cooldown: Date | null;

  @ApiProperty({ type: String, example: 'A', description: 'Correct answer' })
  correctAnswer?: string;

  @ApiProperty({ type: Number, example: 10, description: 'Points gained' })
  points?: number;
}

export class CreateUserDTO { }

export class UpdateUserDTO { }

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'Task title', description: 'Task title' })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1, description: 'Task number in giver year' })
  taskNumber: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date, example: new Date(), description: 'Task release date' })
  releaseDate: Date;

  @IsNotEmpty()
  @IsEnum(Semester)
  @ApiProperty({ type: String, example: 'ZIMOWY', description: 'Task semester' })
  semester: Semester;

  @ApiProperty({ type: String, example: 'Some text', description: 'First part of task in markdown' })
  @IsString()
  @IsNotEmpty()
  partA: string;

  @ApiProperty({ type: String, example: 'Some text', description: 'Second part of task in markdown' })
  @IsString()
  @IsNotEmpty()
  partB: string;
}

export class UpdateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'Task title', description: 'Task title' })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1, description: 'Task number in giver year' })
  taskNumber: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date, example: new Date(), description: 'Task release date' })
  releaseDate: Date;

  @IsNotEmpty()
  @IsEnum(Semester)
  @ApiProperty({ type: String, example: 'ZIMOWY', description: 'Task semester' })
  semester: Semester;

  @ApiProperty({ type: String, example: 'Some text', description: 'First part of task in markdown' })
  @IsOptional()
  @IsString()
  partA?: string;

  @ApiProperty({ type: String, example: 'Some text', description: 'Second part of task in markdown' })
  @IsOptional()
  @IsString()
  partB?: string;

  @ApiProperty({ type: String, example: 'Some text', description: 'First part of task in markdown' })
  @IsOptional()
  @IsString()
  answers?: string;
}

export class UserTokenDataDTO {
  @ApiProperty({ type: String, example: '67c4d2f647bba3861dc871ed', description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ type: String, example: 'example@wp.pl', description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UserPayloadDTO {
  @ApiProperty({ type: String, example: '67c4d2f647bba3861dc871ed', description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: String, example: 'John', description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, example: 'Doe', description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, example: 'example@wp.pl', description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class GetAllUsersDTO implements GetAllUsersResponse {
  @ApiProperty({ type: [UserPayloadDTO], description: 'List of users' })
  users: UserPayloadDTO[];
}

export class GetNextTaskDTO implements GetNextTaskDTO {
  @ApiProperty({ type: String, example: '67c4d2f647bba3861dc871ed', description: 'Task ID' })
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @ApiProperty({ type: Date, example: new Date(), description: 'Task release date' })
  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;
}

export class TaskFileDTO {
  @IsNotEmpty()
  @IsString()
  input: string;

  //eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- This is a class-transformer decorator
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  @IsString()
  part1: string;

  //eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- This is a class-transformer decorator
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  @IsString()
  part2: string;

  //eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- This is a class-transformer decorator
  @Transform(({ value }) => value.toString())
  @IsNotEmpty()
  @IsString()
  seed: string;
}

export class GetUserStatsDTO implements GetUserStatsResponse {
  @IsNotEmpty()
  @IsNumber()
  pointsGeneral: number;

  @IsNotEmpty()
  @IsNumber()
  rankingPosition: number;

  @IsNotEmpty()
  @IsArray()
  pointsTask: number[];
}

export class RankingDTO {
  @ApiProperty({ type: String, example: 'John', description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, example: 'Doe', description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: Number, example: 210834, description: 'User index number' })
  @IsNotEmpty()
  @IsNumber()
  indexNumber: number;

  @ApiProperty({ type: Number, example: 100, description: 'User points' })
  @IsNotEmpty()
  @IsNumber()
  points: number;
}

export class GetRankingDTO implements GetRankingResponse {
  @ApiProperty({ type: [RankingDTO], description: 'Ranking' })
  general: RankingDTO[];

  @ApiProperty({ type: [RankingDTO], description: 'Ranking per task' })
  perTask: RankingDTO[][];
}

export class GetUserDTO implements GetUserResponse {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}


export class AdminPayloadDTO implements GetSingleAdminResponse {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  discordUsername: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GetAllAdminsDTO implements GetAllAdminsResponse {
  @ApiProperty({ type: [AdminPayloadDTO], description: 'List of admins' })
  admins: AdminPayloadDTO[];
}
