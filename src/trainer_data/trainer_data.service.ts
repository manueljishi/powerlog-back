import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExerciseList,
  ExerciseListDocument,
} from './schemas/exerciseList.schema';

@Injectable()
export class TrainerDataService {
  constructor(
    @InjectModel(ExerciseList.name)
    private exerciseListModel: Model<ExerciseListDocument>,
  ) {}

  async createNewExercise(trainerId: string, exerciseName: string) {
    return await this.exerciseListModel.updateOne(
      { trainerId },
      { $push: { exerciseList: { exercise: exerciseName } } },
      { upsert: true },
    );
  }

  async getExerciseList(trainerId: string) {
    return await this.exerciseListModel.find({ trainerId });
  }
}
