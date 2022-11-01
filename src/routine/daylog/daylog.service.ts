import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DayLog, DayLogDocument } from '../schemas/daylog.schema';
import { DayLog as DayLogClass } from '../dto/create.routine.dto';

@Injectable()
export class DaylogService {
  constructor(
    @InjectModel(DayLog.name) private dayLogModel: Model<DayLogDocument>,
  ) {}
  async insertMany(dayLogs: DayLogClass[]) {
    let inserted = dayLogs.map(async (dayLog) => {
      return this.dayLogModel.updateOne(
        { day: dayLog.day, athleteName: dayLog.athleteName },
        dayLog,
        { upsert: true },
      );
    });
    return Promise.all(inserted).then((values) => {
      return values.length;
    });
  }

  async findByDate(date: Date, athleteName: string): Promise<DayLogClass> {
    return await this.dayLogModel.findOne({ day: date, athleteName });
  }
}
