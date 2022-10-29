import { IsArray, IsDate, IsString } from 'class-validator';

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
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
  @IsArray()
  dayLogs: DayLog[];
  @IsString()
  athleteName: string;
}

export class DayLog {
  @IsDate()
  day: Date;
  @IsArray()
  exercises: Exercise[];
}

class Exercise {
  @IsString()
  exercise_name: string;
  @IsArray()
  sets: number[];
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
