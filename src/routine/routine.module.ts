import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DayLog, DayLogSchema } from './schemas/daylog.schema';
import { DaylogService } from './daylog/daylog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DayLog.name, schema: DayLogSchema }]),
  ],
  providers: [DaylogService],
  controllers: [RoutineController],
})
export class RoutineModule {}
