import { Module } from '@nestjs/common';
import { WeeklogController } from './weeklog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WeekLog, WeekLogSchema } from './schemas/weeklog.schema';
import { DayLog, DayLogSchema } from './schemas/daylog.schema';
import { DaylogService } from './daylog/daylog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DayLog.name, schema: DayLogSchema }]),
  ],
  providers: [DaylogService],
  controllers: [WeeklogController],
})
export class WeeklogModule {}
