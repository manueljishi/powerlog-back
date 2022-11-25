import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RoutineService } from './routine.service';
import { ChartsDataDto } from './dto/charts-data.dto';
import { CreateRoutineDto, DayLogDto } from './dto/create.routine.dto';
import { GetDayDto } from './dto/get.day.dto';
import { GetDayRangeDto } from './dto/get.day.range.dto';
import { createCharts } from './functions/charts';

@Controller('routine')
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Get('charts')
  async generateCharts(@Query() query) {
    let resp: ChartsDataDto = {
      athleteUid: query.athlete,
      exercise_name: query.exercise,
      data: [],
    };
    const values = await this.routineService.generateCharts(
      query.exercise,
      query.athlete,
    );
    resp.data = createCharts(values[0], values[1]);
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
      nonEmptyDayLogs.forEach((dayLog) => {
        dayLog.exercises.forEach((exercise) => {
          //check that all values arrays are the same length as sets
          if (
            exercise.sets !== exercise.constraints.length ||
            exercise.sets !== exercise.real_weight.length ||
            exercise.sets !== exercise.reps.length ||
            exercise.sets !== exercise.real_perceived_effort.length
          ) {
            throw new HttpException('Invalid exercise', HttpStatus.BAD_REQUEST);
          }
          exercise.real_weight = exercise.real_weight.fill(0);
          exercise.real_perceived_effort =
            exercise.real_perceived_effort.fill(0);
        });
      });

      let resp = await this.routineService.insertMany(nonEmptyDayLogs);
      if (resp > 0) {
        return { message: 'Created', data: resp };
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/date')
  @HttpCode(HttpStatus.OK)
  async findByDate(@Body() date: GetDayDto) {
    let resp = await this.routineService.findByDate(date.date, date.athleteUid);
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
    let resp = await this.routineService.findByDateRange(
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
    return this.routineService.updateDay(dayLog).then((value) => {
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
