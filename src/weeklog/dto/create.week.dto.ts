import mongoose from 'mongoose';

export class CreateWeekDto {
  startDate: Date;
  endDate: Date;
  dayLogs: DayLog[];
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
  rpe: number[];
  rir: number[];
  weight: number[];
  real_perceived_effort: number[];
  real_weight: number[];
  is_rpe: boolean;
  comments: string;
}
