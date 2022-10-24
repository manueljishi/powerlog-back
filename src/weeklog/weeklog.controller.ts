import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { DaylogService } from './daylog/daylog.service';
import { CreateWeekDto } from './dto/create.week.dto';
import { WeekLogDTO } from './dto/weeklog.dto';
import { WeeklogService } from './weeklog/weeklog.service';

@Controller('weeklog')
export class WeeklogController {
  constructor(
    private weekLogService: WeeklogService,
    private dayLogService: DaylogService,
  ) {}

  @Post()
  async createWeek(@Body() createWeekDto: CreateWeekDto) {
    let wrongDate = new Date(0);
    if (
      createWeekDto.startDate > createWeekDto.endDate ||
      createWeekDto.startDate == wrongDate ||
      createWeekDto.endDate == wrongDate ||
      createWeekDto.athleteName == null
    ) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error creating data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const weekLog = new WeekLogDTO(
      createWeekDto.startDate,
      createWeekDto.endDate,
    );
    const weekId = await this.weekLogService.createWeek(weekLog);
    createWeekDto.dayLogs.forEach((e) => {
      e.weekId = weekId;
      console.log(e);
    });
    await this.dayLogService.insertMany(createWeekDto.dayLogs);
    return;
  }
}
