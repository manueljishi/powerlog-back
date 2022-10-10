import { Test, TestingModule } from '@nestjs/testing';
import { WeeklogController } from './weeklog.controller';

describe('WeeklogController', () => {
  let controller: WeeklogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklogController],
    }).compile();

    controller = module.get<WeeklogController>(WeeklogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
