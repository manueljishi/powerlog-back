import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DaylogService } from './daylog/daylog.service';
import { CreateRoutineDto } from './dto/create.routine.dto';
import { RoutineController } from './routine.controller';
import { DayLog } from './schemas/daylog.schema';

describe('RoutineController', () => {
  let controller: RoutineController;
  let dayService: DaylogService;
  let testRoutine: CreateRoutineDto = {
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-07'),
    athleteName: 'test',
    dayLogs: [
      {
        day: new Date('2021-01-01'),
        exercises: [
          {
            exercise_name: 'test',
            sets: [1, 2, 3],
            reps: [1, 2, 3],
            constraints: [{ rpe: '8' }, { rpe: '8' }, { rpe: '8' }],
            real_perceived_effort: [],
            real_weight: [],
            comments: 'test',
          },
        ],
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineController],
      providers: [
        DaylogService,
        {
          provide: getModelToken(DayLog.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RoutineController>(RoutineController);
    dayService = module.get<DaylogService>(DaylogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should filter days sent correctly', () => {
    it('should create all days', async () => {
      jest.spyOn(dayService, 'insertMany').mockImplementation(() => {
        return Promise.resolve(1);
      });
      expect(await controller.createWeek(testRoutine)).toEqual(1);
    });

    it('should skip days with empty exercises', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.dayLogs[0].exercises = [];
      jest.spyOn(dayService, 'insertMany').mockImplementation(() => {
        return Promise.resolve(0);
      });
      expect(await controller.createWeek(testRoutine2)).toEqual(0);
    });

    it('should skip days with empty startDate', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.startDate = null;
      try {
        await controller.createWeek(testRoutine2);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        expect(e.getResponse()).toEqual('Missing required fields');
      }
    });

    it('should skip days with empty endDate', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.endDate = null;
      try {
        await controller.createWeek(testRoutine2);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        expect(e.getResponse()).toEqual('Missing required fields');
      }
    });

    it('should skip days with empty athleteName', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.athleteName = null;
      try {
        await controller.createWeek(testRoutine2);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        expect(e.getResponse()).toEqual('Missing required fields');
      }
    });

    it('should skip weeks where startDate and endDate are not in order', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.startDate = new Date('2021-01-07');
      testRoutine2.endDate = new Date('2021-01-01');
      try {
        await controller.createWeek(testRoutine2);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
        expect(e.getResponse()).toEqual('Start date must be before end date');
      }
    });
  });
});
