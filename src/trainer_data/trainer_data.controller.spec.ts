import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseList } from './schemas/exercise_list.schema';
import { TrainerDataController } from './trainer_data.controller';
import { TrainerDataService } from './trainer_data.service';

describe('TrainerDataController', () => {
  let controller: TrainerDataController;
  let service: TrainerDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerDataController],
      providers: [
        TrainerDataService,
        {
          provide: getModelToken(ExerciseList.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TrainerDataController>(TrainerDataController);
    service = module.get<TrainerDataService>(TrainerDataService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw if missing create params', async () => {
    try {
      await controller.createNewExercise({
        athleteName: 'test',
        exerciseName: '',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should throw if missing get params', async () => {
    try {
      await controller.getExerciseList('');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
