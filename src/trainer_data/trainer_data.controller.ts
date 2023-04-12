import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { NewExerciseDto } from './domain/dto/new_exercise.dto';
import { TrainerDataService } from './infrastructure/trainer_data.service';

@Controller('trainer-data')
export class TrainerDataController {
  constructor(private readonly trainerDataService: TrainerDataService) {}

  @Get(':trainerId')
  async getExerciseList(@Param('trainerId') trainerId: string) {
    return this.trainerDataService.getExerciseList(trainerId);
  }
}
