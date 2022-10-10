import { Test, TestingModule } from '@nestjs/testing';
import { DaylogService } from './daylog.service';

describe('DaylogService', () => {
  let service: DaylogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaylogService],
    }).compile();

    service = module.get<DaylogService>(DaylogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
