import { ParseArrayPipe } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class IConstraint {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  rpe?: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  rir?: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  fixedWeight?: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  percentage?: string;
}

export class CreateRoutineDto {
  @ValidateNested({ each: true })
  @Type(() => DayLogDto)
  dayLogs: DayLogDto[];
}

export class DayLogDto {
  @IsDateString()
  day: Date;

  @ValidateNested({ each: true })
  @Type(() => Exercise)
  exercises: Exercise[];

  @IsString()
  athleteUid: string;

  @IsOptional()
  @IsBoolean()
  isBlockStart: boolean;

  @IsOptional()
  @IsBoolean()
  isBlockEnd: boolean;
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

  @Type(() => Number)
  @IsNumber({}, { each: true })
  real_perceived_effort: number[];

  @Type(() => Number)
  @IsNumber({}, { each: true })
  real_weight: number[];

  @IsString()
  comments: string;
}
