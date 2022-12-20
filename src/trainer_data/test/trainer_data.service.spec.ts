import { Test, TestingModule } from '@nestjs/testing';
import { TrainerDataService } from '../trainer_data.service';

describe.skip('TrainerDataService', () => {
  let service: TrainerDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainerDataService],
    }).compile();

    service = module.get<TrainerDataService>(TrainerDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
