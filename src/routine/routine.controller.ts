import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { DaylogService } from './daylog/daylog.service';
import { CreateRoutineDto } from './dto/create.routine.dto';

@Controller('routine')
export class RoutineController {
  constructor(private dayLogService: DaylogService) {}

  @Post()
  async createWeek(@Body() newRoutine: CreateRoutineDto) {
    if (
      newRoutine.startDate == null ||
      newRoutine.endDate == null ||
      newRoutine.athleteName == null
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      if (newRoutine.startDate >= newRoutine.endDate) {
        throw new HttpException(
          'Start date must be before end date',
          HttpStatus.BAD_REQUEST,
        );
      }
      const nonEmptyDayLogs = newRoutine.dayLogs.filter(
        (dayLog) => dayLog.exercises.length > 0,
      );
      return await this.dayLogService.insertMany(nonEmptyDayLogs);
    }
  }

  @Post('/date')
  async findByDate(@Body() date: { date: Date }) {
    const sentDate = new Date(date.date);
    return await this.dayLogService.findByDate(sentDate);
  }
}
