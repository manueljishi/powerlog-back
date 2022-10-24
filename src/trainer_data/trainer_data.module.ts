import { Module } from '@nestjs/common';
import { TrainerDataService } from './trainer_data.service';
import { TrainerDataController } from './trainer_data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExerciseListSchema,
  ExerciseList,
} from './schemas/exercise_list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExerciseList.name, schema: ExerciseListSchema },
    ]),
  ],
  controllers: [TrainerDataController],
  providers: [TrainerDataService],
})
export class TrainerDataModule {}
