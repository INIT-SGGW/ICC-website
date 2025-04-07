import { ApiProperty } from '@nestjs/swagger';
import type { SendAnswerTaskRequest } from '@repo/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerTaskBody implements SendAnswerTaskRequest {
  @ApiProperty({ type: String, example: 'INIT', description: 'Answer to task' })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
