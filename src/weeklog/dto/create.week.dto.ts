export class CreateWeekDto {
  startDate: Date;
  endDate: Date;
  dayLogs: [DayLog];
}

class DayLog {
  weekId: string;
  weekDay: string;
  day: Date;
  exercises: [Exercise];
}

class Exercise {
  exercise_name: string;
  sets: [number];
  rpe: [number];
  rir: [number];
  weight: [number];
  real_perceived_effort: [number];
  real_weight: [number];
  is_rpe: boolean;
  comments: string;
}
