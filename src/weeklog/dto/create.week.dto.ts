import mongoose from 'mongoose';
import { IConstraint } from '../schemas/daylog.schema';

export class CreateWeekDto {
  startDate: Date;
  endDate: Date;
  dayLogs: DayLog[];
  athleteName: string;
}

export class DayLog {
  weekId: mongoose.Types.ObjectId;
  weekDay: string;
  day: Date;
  exercises: Exercise[];
}

class Exercise {
  exercise_name: string;
  sets: number[];
  constraints: IConstraint[];
  real_perceived_effort: number[];
  real_weight: number[];
  comments: string;
}
