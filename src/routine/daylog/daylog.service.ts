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
    const intserted = await this.dayLogModel.insertMany(dayLogs);
    return intserted.length;
  }

  async findByDate(date: Date) {
    return await this.dayLogModel.find({ day: date });
  }
}
