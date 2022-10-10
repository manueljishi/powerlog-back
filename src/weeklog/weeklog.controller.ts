import { Body, Controller, Post } from '@nestjs/common';
import { CreateWeekDto } from './dto/create.week.dto';
import { WeekLogDTO } from './dto/weeklog.dto';
import { WeeklogService } from './weeklog/weeklog.service';

@Controller('weeklog')
export class WeeklogController {
  constructor(private weekLogService: WeeklogService) {}

  @Post()
  createWeek(@Body() createWeekDto: CreateWeekDto): void {
    const weekLog = new WeekLogDTO(
      createWeekDto.startDate,
      createWeekDto.endDate,
    );
    this.weekLogService.createWeek(weekLog);

    return;
  }
}
