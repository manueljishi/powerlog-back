import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DayLog, DayLogDocument } from '../schemas/daylog.schema';
import { DayLogDto as DayLogClass } from '../dto/create.routine.dto';
import { UpdateUserInputDto } from '../dto/update.user.input.dto';

@Injectable()
export class DaylogService {
  constructor(
    @InjectModel(DayLog.name) private dayLogModel: Model<DayLogDocument>,
  ) {}
  async insertMany(dayLogs: DayLogClass[]) {
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
    console.log(startDate, endDate);
    return await this.dayLogModel.find({
      day: { $gte: startDate, $lte: endDate },
      athleteUid,
    });
  }

  async updateDay(dayLog: DayLogClass) {
    return this.dayLogModel
      .updateOne({ day: dayLog.day, athleteUid: dayLog.athleteUid }, dayLog)
      .then((value) => {
        return value;
      });
  }

  async updateUserInput(updateUserInputDto: UpdateUserInputDto) {
    // this.dayLogModel.findById(updateUserInputDto._id).then((dayLog: any) => {
    //   if (updateUserInputDto.dataType === 0) {
    //     dayLog.exercises[updateUserInputDto.exerciseIndex].real_weight =
    //       updateUserInputDto.data;
    //   } else {
    //     dayLog.exercises[
    //       updateUserInputDto.exerciseIndex
    //     ].real_perceived_effort = updateUserInputDto.data;
    //   }
    //   return this.updateDay(dayLog);
    // });
    let updateStr = {};
    if (updateUserInputDto.dataType === 0) {
      updateStr[`exercises[0].real_weight`] = updateUserInputDto.data;
    } else {
      updateStr[
        `exercises[${updateUserInputDto.exerciseIndex}].real_perceived_effort`
      ] = updateUserInputDto.data;
    }
    console.log(updateStr);
    this.dayLogModel
      .findByIdAndUpdate(
        { _id: updateUserInputDto._id },
        {
          $set: updateStr,
        },
      )
      .then((value: any) => {
        console.log(JSON.stringify(value.exercises[0].real_weight));
      });
  }
}
