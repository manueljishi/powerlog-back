import {
  IsArray,
  IsDate,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class IConstraint {
  @IsString()
  rpe?: string;
  @IsString()
  rir?: string;
  @IsString()
  fixedWeight?: string;
  @IsString()
  percentage?: string;
}

export class CreateRoutineDto {
  @IsDateString()
  startDate: Date;
  @IsDateString()
  endDate: Date;
  @IsArray()
  dayLogs: DayLogDto[];
  @IsString()
  athleteName: string;
}

export class DayLogDto {
  @IsDateString()
  day: Date;
  @IsArray()
  exercises: Exercise[];
  @IsString()
  athleteName: string;
}

class Exercise {
  @IsString()
  exercise_name: string;
  @IsNumber()
  sets: number;
  @IsArray()
  reps: number[];
  @IsArray()
  constraints: IConstraint[];
  @IsArray()
  real_perceived_effort: number[];
  @IsArray()
  real_weight: number[];
  @IsString()
  comments: string;
}
