import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
  } from '@nestjs/common';
  import { NewExerciseDto } from '../domain/dto/new_exercise.dto';
  import { TrainerDataService } from '../infrastructure/trainer_data.service';
  
  @Controller('trainer-data/exercise')
  export class CreateExerciseController {
    constructor(private readonly trainerDataService: TrainerDataService) {}
    @Post()
    async createNewExercise(@Body() newExercise: NewExerciseDto) {
      return this.trainerDataService.createNewExercise(
      newExercise.trainerId,
      newExercise.exerciseCategory,
      newExercise.exerciseName
      );
    }
  }
  