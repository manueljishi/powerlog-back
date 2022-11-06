import { ParseArrayPipe } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class IConstraint {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rpe?: number;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rir?: string;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  fixedWeight?: string;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  percentage?: string;
}

export class CreateRoutineDto {
  @IsDateString()
  startDate: Date;
  @IsDateString()
  endDate: Date;
  @ValidateNested({ each: true })
  @Type(() => DayLogDto)
  dayLogs: DayLogDto[];
  @IsString()
  athleteName: string;
}

export class DayLogDto {
  @IsDateString()
  day: Date;
  @ValidateNested({ each: true })
  @Type(() => Exercise)
  exercises: Exercise[];
  @IsString()
  athleteName: string;
}

class Exercise {
  @IsString()
  exercise_name: string;
  @IsNumber()
  @Transform(({ value }) => Number(value))
  sets: number;
  @Type(() => Number)
  @IsNumber({}, { each: true })
  reps: number[];
  @ValidateNested({ each: true })
  @Type(() => IConstraint)
  constraints: IConstraint[];
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  real_perceived_effort: number[];
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  real_weight: number[];
  @IsString()
  comments: string;
}
