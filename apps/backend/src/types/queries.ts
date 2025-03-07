import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindTasksQuery {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'Pole "year" nie może być puste' })
  @IsNumber({}, { message: 'Pole "year" musi być liczbą' })
  year: number;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'Pole "task" nie może być puste' })
  @IsNumber({}, { message: 'Pole "task" musi być liczbą' })
  task: number;
}

export class FindOpenTasksQuery {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'Pole "year" nie może być puste' })
  @IsNumber({}, { message: 'Pole "year" musi być liczbą' })
  year: number;
}
