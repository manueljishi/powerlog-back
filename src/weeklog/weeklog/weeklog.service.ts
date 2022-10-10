import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeekLog, WeekLogDocument } from '../schemas/weeklog.schema';
import { WeekLogDTO } from '../dto/weeklog.dto';

@Injectable()
export class WeeklogService {
  constructor(
    @InjectModel(WeekLog.name) private weekLogModel: Model<WeekLogDocument>,
  ) {}

  async createWeek(weekLogDto: WeekLogDTO) {
    const createdWeek = new this.weekLogModel(weekLogDto);
    await createdWeek.save();
    console.log(createdWeek);
  }
}
