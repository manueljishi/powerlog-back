import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DaylogService } from './daylog/daylog.service';
import { ChartsDataDto } from './dto/charts-data.dto';
import { CreateRoutineDto, DayLogDto } from './dto/create.routine.dto';
import { GetDayDto } from './dto/get.day.dto';
import { GetDayRangeDto } from './dto/get.day.range.dto';
import { initializeChartsData } from './functions/charts';

@Controller('routine')
export class RoutineController {
  constructor(private dayLogService: DaylogService) {}

  /*
  Coger los dias de inicio y fin,
  Coger los ejericios con ese nombre
  Sortear los dias por fecha y ver cual ha sido el peso maximo que se ha tirado, con
  */
  @Put('charts')
  async generateCharts(@Query() query) {
    let resp: ChartsDataDto = {
      athleteUid: query.athlete,
      exercise_name: query.exercise,
      data: [],
    };
    const values = await this.dayLogService.generateCharts(
      query.exercise,
      query.athlete,
    );
    resp.data = initializeChartsData(values[0]);
    return resp;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createWeek(@Body() newRoutine: CreateRoutineDto) {
    const nonEmptyDayLogs = newRoutine.dayLogs.filter(
      (dayLog) => dayLog.exercises.length > 0,
    );
    if (nonEmptyDayLogs.length === 0) {
      throw new HttpException('No days to create', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.dayLogService.insertMany(nonEmptyDayLogs);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/date')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async updateDay(@Body() dayLog: DayLogDto) {
    return this.dayLogService.updateDay(dayLog).then((value) => {
      if (value.modifiedCount === 0) {
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
