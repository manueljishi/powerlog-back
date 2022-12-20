import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DayLog } from '../schemas/daylog.schema';
import { RoutineService } from '../routine.service';

describe('RoutineService', () => {
  let service: RoutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutineService,
        {
          provide: getModelToken(DayLog.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RoutineService>(RoutineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
