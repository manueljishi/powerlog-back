import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DaylogService } from './daylog/daylog.service';
import { CreateRoutineDto } from './dto/create.routine.dto';
import { GetDayDto } from './dto/get.day.dto';

@Controller('routine')
export class RoutineController {
  constructor(private dayLogService: DaylogService) {}

  @Post()
  async createWeek(@Body() newRoutine: CreateRoutineDto) {
    if (newRoutine.startDate >= newRoutine.endDate) {
      throw new HttpException(
        'Start date must be before end date',
        HttpStatus.BAD_REQUEST,
      );
    }
    const nonEmptyDayLogs = newRoutine.dayLogs.filter(
      (dayLog) => dayLog.exercises.length > 0,
    );
    nonEmptyDayLogs.forEach((dayLog) => {
      dayLog.athleteName = newRoutine.athleteName;
    });
    return await this.dayLogService.insertMany(nonEmptyDayLogs);
  }

  @Post('/date')
  async findByDate(@Body() date: GetDayDto) {
    let resp = await this.dayLogService.findByDate(date.date, date.athleteName);
    if (!resp) {
      throw new HttpException(
        'No day found for this date',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return resp;
    }
  }
}
