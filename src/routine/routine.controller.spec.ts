import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
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
        athleteName: 'test',
        exercises: [
          {
            exercise_name: 'test',
            sets: 3,
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
        expect(e).toBeInstanceOf(Error);
      }
    });

    it('should skip days with empty endDate', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.endDate = null;
      try {
        await controller.createWeek(testRoutine2);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    it('should skip days with empty athleteName', async () => {
      let testRoutine2 = { ...testRoutine };
      testRoutine2.dayLogs[0].athleteName = null;
      try {
        await controller.createWeek(testRoutine2);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
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

  describe('getting days based on date', () => {
    it('should return a day if exists', async () => {
      jest.spyOn(dayService, 'findByDate').mockImplementation(() => {
        return Promise.resolve(testRoutine.dayLogs[0]);
      });
      let dataParams = {
        date: testRoutine.dayLogs[0].day,
        athleteName: testRoutine.dayLogs[0].athleteName,
      };
      expect(await controller.findByDate(dataParams)).toEqual(
        testRoutine.dayLogs[0],
      );
    });

    it('should return an exception if day was not found', async () => {
      jest.spyOn(dayService, 'findByDate').mockImplementation(() => {
        return Promise.resolve(null);
      });
      let dataParams = {
        date: new Date('2021-01-04'),
        athleteName: testRoutine.dayLogs[0].athleteName,
      };
      try {
        await controller.findByDate(dataParams);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(e.getResponse()).toEqual('No day found for this date');
      }
    });
  });
});
