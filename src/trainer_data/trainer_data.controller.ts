import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewExerciseDto } from './dto/new_exercise.dto';
import { TrainerDataService } from './trainer_data.service';

@Controller('trainer-data')
export class TrainerDataController {
  constructor(private readonly trainerDataService: TrainerDataService) {}
  @Post()
  async createNewExercise(@Body() newExercise: NewExerciseDto) {
    if (!newExercise.athleteName || !newExercise.exerciseName) {
      return 'Missing required fields';
    }
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
