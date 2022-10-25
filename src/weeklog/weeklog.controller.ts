import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { DaylogService } from './daylog/daylog.service';
import { CreateWeekDto } from './dto/create.week.dto';

@Controller('weeklog')
export class WeeklogController {
  constructor(private dayLogService: DaylogService) {}

  @Post()
  async createWeek(@Body() createWeekDto: CreateWeekDto) {
    const nonEmptyDayLogs = createWeekDto.dayLogs.filter(
      (dayLog) => dayLog.exercises.length > 0,
    );
    await this.dayLogService.insertMany(nonEmptyDayLogs);
    return;
  }

  @Post('/date')
  async findByDate(@Body() date: { date: Date }) {
    const sentDate = new Date(date.date);
    return await this.dayLogService.findByDate(sentDate);
  }
}
