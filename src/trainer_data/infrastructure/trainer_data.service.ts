import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExercisesSchema,
  ExerciseListDocument,
} from '../domain/schemas/exerciseList.schema';

@Injectable()
export class TrainerDataService {
  constructor(
    @InjectModel(ExercisesSchema.name)
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
