import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExerciseList,
  ExerciseListDocument,
} from './schemas/exercise_list.schema';

@Injectable()
export class TrainerDataService {
  constructor(
    @InjectModel(ExerciseList.name)
    private exerciseListModel: Model<ExerciseListDocument>,
  ) {}

  async createNewExercise(athleteName: string, exerciseName: string) {
    console.log(athleteName, exerciseName);
    return await this.exerciseListModel.updateOne(
      { athleteName },
      { $push: { exercise_list: { exercise: exerciseName } } },
      { upsert: true },
    );
  }

  async getExerciseList(athleteName: string) {
    return await this.exerciseListModel.find({ athleteName });
  }
}
