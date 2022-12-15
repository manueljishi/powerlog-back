import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DayLog, DayLogDocument } from './schemas/daylog.schema';
import { DayLogDto as DayLogClass } from './dto/create.routine.dto';
import { UpdateDayLogDto } from './dto/update.routine.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectModel(DayLog.name) private dayLogModel: Model<DayLogDocument>,
  ) {}
  async insertMany(dayLogs: DayLogClass[]): Promise<number> {
    let inserted = dayLogs.map(async (dayLog) => {
      return this.dayLogModel.updateOne(
        { day: dayLog.day, athleteUid: dayLog.athleteUid },
        dayLog,
        { upsert: true },
      );
    });
    return Promise.all(inserted).then((values) => {
      return values.length;
    });
  }

  async findByDate(date: Date, athleteUid: string): Promise<DayLogClass> {
    return await this.dayLogModel.findOne({ day: date, athleteUid });
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
    athleteUid: string,
  ): Promise<DayLogClass[]> {
    return await this.dayLogModel.find({
      day: { $gte: startDate, $lte: endDate },
      athleteUid,
    });
  }

  async updateDay(dayLog: UpdateDayLogDto) {
    return this.dayLogModel
      .findByIdAndUpdate(dayLog._id, dayLog)
      .then((value) => {
        console.log(value);
        return value;
      });
  }

  async generateCharts(exercise: string, athleteUid: string) {
    return Promise.all([
      this.getAllExercises(exercise, athleteUid),
      this.getAllEndingDates(athleteUid),
    ]).then((values) => {
      return values;
    });
  }

  async getAllExercises(exercise: string, athleteUid: string) {
    return await this.dayLogModel.find(
      {
        athleteUid,
        exercises: { $elemMatch: { exercise_name: exercise } },
      },
      {
        _id: 0,
        exercises: { $elemMatch: { exercise_name: exercise } },
        day: 1,
      },
      { sort: { day: 1 } },
    );
  }

  async getAllStartingDates(athleteUid: string) {
    return await this.dayLogModel.find(
      { athleteUid, isBlockStart: true },
      { day: 1, _id: 0 },
    );
  }

  async getAllEndingDates(athleteUid: string): Promise<Date[]> {
    return await this.dayLogModel.find(
      { athleteUid, isBlockEnd: true },
      { day: 1, _id: 0 },
      { sort: { day: 1 } },
    );
  }
}