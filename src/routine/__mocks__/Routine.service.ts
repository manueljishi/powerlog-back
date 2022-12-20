import { routineStub } from '../test/stubs/Routine.stub';

export const RoutineService = jest.fn().mockReturnValue({
  insertMany: jest.fn().mockResolvedValue(routineStub().dayLogs.length),
  findByDate: jest.fn().mockResolvedValue(routineStub().dayLogs[0]),
  findByDateRange: jest
    .fn()
    .mockResolvedValue(routineStub().dayLogs.slice(0, 3)),
  updateDay: jest.fn().mockResolvedValue(routineStub().dayLogs[0]),
  generateCharts: jest.fn().mockResolvedValue(routineStub().dayLogs[0]),
});
