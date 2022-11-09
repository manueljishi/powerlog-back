import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { DaylogService } from './daylog/daylog.service';
import { CreateRoutineDto, DayLogDto } from './dto/create.routine.dto';
import { GetDayDto } from './dto/get.day.dto';
import { GetDayRangeDto } from './dto/get.day.range.dto';

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
    if (nonEmptyDayLogs.length === 0) {
      throw new HttpException('No days to create', HttpStatus.BAD_REQUEST);
    }
    return await this.dayLogService.insertMany(nonEmptyDayLogs);
  }

  @Post('/date')
  async findByDate(@Body() date: GetDayDto) {
    let resp = await this.dayLogService.findByDate(date.date, date.athleteUid);
    if (!resp) {
      throw new HttpException(
        'No day found for this date',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return resp;
    }
  }

  @Post('/results')
  async findByDateRange(@Body() dateRange: GetDayRangeDto) {
    let resp = await this.dayLogService.findByDateRange(
      dateRange.startDate,
      dateRange.endDate,
      dateRange.athleteUid,
    );
    if (!resp) {
      throw new HttpException(
        'No days found for this date range',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return resp;
    }
  }

  @Put()
  async updateDay(@Body() dayLog: DayLogDto) {
    return this.dayLogService.updateDay(dayLog).then((value) => {
      if (value === 0) {
        throw new HttpException(
          'No day found for this date',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return 'Day updated successfully';
      }
    });
  }
}
