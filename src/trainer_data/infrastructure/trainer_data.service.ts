import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExerciseList,
  ExerciseListDocument,
} from '../domain/schemas/exerciseList.schema';
import { NewExerciseDto } from '../domain/dto/new_exercise.dto';

@Injectable()
export class TrainerDataService {
  constructor(
    @InjectModel(ExerciseList.name)
    private exerciseListModel: Model<ExerciseListDocument>,
  ) {}

  async createNewExercise(trainerId: string, exerciseCat: string, exerciseName: string) {
    return await this.exerciseListModel.updateOne(
      { trainerId },
      { $push: { [exerciseCat]: exerciseName } },
      { upsert: true },
    );
  }

  async getExerciseList(trainerId: string) {
    return await this.exerciseListModel.find({ trainerId });
  }
}
