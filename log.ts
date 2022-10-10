//week
export class Week {
  weekId: 'ObjectID (default)';
  startDate = Date;
  endDate = Date;
}

//log
export class Log {
  weekId = 'weekId';
  weekDay = 'monday,tuesday...';
  day = 'Date';
  exercises = [
    {
      exercise_name: 'string',
      sets: 'number',
      rpe: '[number]',
      rir: '[number]',
      weight: '[number]',
      real_perceived_effort: '[number]',
      real_weight: '[number]',
      is_rpe: 'bool',
      comments: 'string',
    },
  ];
}
