import { Test, TestingModule } from '@nestjs/testing';
import { RoutineService } from '../routine.service';
import { CreateRoutineDto } from '../dto/create.routine.dto';
import { RoutineController } from '../routine.controller';
import {
  getOneDayLogWithCustomReps,
  routineStub,
  singleRoutineStub,
} from './stubs/Routine.stub';
import { error } from 'console';

jest.mock('../routine.service');

describe('RoutineController', () => {
  let controller: RoutineController;
  let routineService: RoutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineController],
      providers: [RoutineService],
    }).compile();

    controller = module.get<RoutineController>(RoutineController);
    routineService = module.get<RoutineService>(RoutineService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should set all created days real_weight and real_perceived_effort to 0', async () => {
    const newRoutine: CreateRoutineDto = singleRoutineStub();
    jest
      .spyOn(routineService, 'insertMany')
      .mockImplementation(() => Promise.resolve(1));
    const resp = await controller.createWeek(newRoutine);

    error(resp.message);
    expect(resp.message).toEqual('Created');
    expect(routineService.insertMany).toHaveBeenCalledTimes(1);
  });

  test('should handle strings in reps, if there is string in reps rpe is 10', async () => {
    let dayLogData = getOneDayLogWithCustomReps(['4s + 4s', '8']);
    jest
      .spyOn(routineService, 'generateCharts')
      .mockImplementation(() => Promise.resolve([[dayLogData], []]));
    const returnedData = await controller.generateCharts({
      athleteUid: dayLogData.athleteUid,
      exercise_name: 'Comp Sq',
    });
    expect(returnedData.data[0].estimated_weight).toBe(
      dayLogData.exercises[0].real_weight[0],
    );
  });

  test('should handle strings in reps, if there is string in reps rpe is 10', async () => {
    let dayLogData = getOneDayLogWithCustomReps(['AMRAP', '8']);
    jest
      .spyOn(routineService, 'generateCharts')
      .mockImplementation(() => Promise.resolve([[dayLogData], []]));
    const returnedData = await controller.generateCharts({
      athleteUid: dayLogData.athleteUid,
      exercise_name: 'Comp Sq',
    });
    expect(returnedData.data[0].estimated_weight).toBe(
      dayLogData.exercises[0].real_weight[0],
    );
  });

  test('should create necessary data for the charts', async () => {
    let dayLogData = getOneDayLogWithCustomReps(['8', '8']);
    jest
      .spyOn(routineService, 'generateCharts')
      .mockImplementation(() => Promise.resolve([[dayLogData], []]));
    const returnedData = await controller.generateCharts({
      athleteUid: dayLogData.athleteUid,
      exercise_name: 'Comp Sq',
    });
    expect(returnedData.data[0].estimated_weight).toBe(295.28);
  });
});
