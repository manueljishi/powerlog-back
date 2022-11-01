import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { NewExerciseDto } from './dto/new_exercise.dto';
import { TrainerDataService } from './trainer_data.service';

@Controller('trainer-data')
export class TrainerDataController {
  constructor(private readonly trainerDataService: TrainerDataService) {}
  @Post()
  async createNewExercise(@Body() newExercise: NewExerciseDto) {
    return this.trainerDataService.createNewExercise(
      newExercise.athleteName,
      newExercise.exerciseName,
    );
  }

  @Get(':athleteName')
  async getExerciseList(@Param('athleteName') athleteName: string) {
    return this.trainerDataService.getExerciseList(athleteName);
  }
}
