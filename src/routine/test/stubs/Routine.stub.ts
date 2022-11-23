import { CreateRoutineDto } from 'src/routine/dto/create.routine.dto';
import { DayLog } from 'src/routine/schemas/daylog.schema';

export const routineStub = (): CreateRoutineDto => ({
  dayLogs: [
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-01T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['8', '8'],
          constraints: [
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [180, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: true,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-03T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['8', '8'],
          constraints: [
            {
              rpe: '8.5',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [190, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: false,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-05T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['8', '8'],
          constraints: [
            {
              rpe: '8.3',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [200, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: true,
      isBlockStart: false,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-07T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['8', '8'],
          constraints: [
            {
              rpe: '5',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [140, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: true,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-09T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['8', '8'],
          constraints: [
            {
              rpe: '4.5',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [130, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: false,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-11T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['8', '8'],
          constraints: [
            {
              rpe: '5.5',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [150, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: true,
      isBlockStart: false,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-13T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['6', '6'],
          constraints: [
            {
              rpe: '',
              rir: '2.5',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [175, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: true,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-15T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['6', '6'],
          constraints: [
            {
              rpe: '',
              rir: '2',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [185, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: false,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-17T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['6', '6'],
          constraints: [
            {
              rpe: '4.5',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [215, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: true,
      isBlockStart: false,
    },
    {
      athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
      day: new Date('2022-10-19T00:00:00.000Z'),
      exercises: [
        {
          exercise_name: 'Comp Sq',
          sets: 2,
          reps: ['3', '8'],
          constraints: [
            {
              rpe: '9',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
            {
              rpe: '8',
              rir: '',
              fixedWeight: '',
              percentage: '',
            },
          ],
          real_perceived_effort: [2, 1],
          real_weight: [225, 120],
          comments: 'eoooo',
        },
      ],
      isBlockEnd: false,
      isBlockStart: true,
    },
  ],
});

export const getOneDayLogWithCustomReps = (reps: string[]): any => {
  return {
    athleteUid: 'P9fFcJBDGRYFB9NFHqrVFIxfraE2',
    day: new Date('2022-10-19T00:00:00.000Z'),
    exercises: [
      {
        exercise_name: 'Comp Sq',
        sets: 2,
        reps: reps,
        constraints: [
          {
            rpe: '9',
            rir: '',
            fixedWeight: '',
            percentage: '',
          },
          {
            rpe: '8',
            rir: '',
            fixedWeight: '',
            percentage: '',
          },
        ],
        real_perceived_effort: [2, 1],
        real_weight: [225, 120],
        comments: 'eoooo',
      },
    ],
    isBlockEnd: false,
    isBlockStart: true,
  };
};
