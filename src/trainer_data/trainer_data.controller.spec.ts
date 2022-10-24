import { Test, TestingModule } from '@nestjs/testing';
import { TrainerDataController } from './trainer_data.controller';
import { TrainerDataService } from './trainer_data.service';

describe('TrainerDataController', () => {
  let controller: TrainerDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerDataController],
      providers: [TrainerDataService],
    }).compile();

    controller = module.get<TrainerDataController>(TrainerDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
