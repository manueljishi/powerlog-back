import { Test, TestingModule } from '@nestjs/testing';
import { WeeklogService } from './weeklog.service';

describe('WeeklogService', () => {
  let service: WeeklogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklogService],
    }).compile();

    service = module.get<WeeklogService>(WeeklogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
