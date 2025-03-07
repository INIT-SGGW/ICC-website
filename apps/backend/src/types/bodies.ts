import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerTaskBody {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  task: number;

  @IsNotEmpty()
  @IsString()
  part: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
