import { Module } from '@nestjs/common';
import { TrainerDataService } from './infrastructure/trainer_data.service';
import { TrainerDataController } from './trainer_data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExerciseListSchema,
  ExerciseList,
} from './domain/schemas/exerciseList.schema';
import { CreateExerciseController, UpdateExerciseController } from './presentation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExerciseList.name, schema: ExerciseListSchema },
    ]),
  ],
  controllers: [TrainerDataController, CreateExerciseController, UpdateExerciseController],
  providers: [TrainerDataService],
})
export class TrainerDataModule { }
