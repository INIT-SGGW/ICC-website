import { Faculty, Semester } from '@repo/types';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetAllTasksQuery {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'Pole "year" nie może być puste' })
  @IsNumber({}, { message: 'Pole "year" musi być liczbą' })
  year: number;

  @IsNotEmpty({ message: 'Pole "semester" nie może być puste' })
  @IsEnum(Semester, { message: 'Pole "semester" musi być jednym z: "letni", "zimowy"' })
  semester: Semester;
}

export class GetRankingQuery {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber({}, { message: 'Pole "year" musi być liczbą' })
  year?: number

  @IsOptional()
  @IsEnum(Faculty, { message: 'Pole "faculty" musi być jednym z: "Informatyka", "Informatyka i Ekonometria"' })
  faculty?: Faculty
}