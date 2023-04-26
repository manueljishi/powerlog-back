
import {
    Body,
    Controller,
    Put
} from '@nestjs/common';
import { TrainerDataService } from '../infrastructure/trainer_data.service';
import { UpdateExerciseDto } from '../domain/dto/update-exercise.dto';

@Controller('trainer-data/exercise')
export class UpdateExerciseController {
    constructor(private readonly trainerDataService: TrainerDataService) { }
    @Put()
    async updateExercise(@Body() updateExerciseData: UpdateExerciseDto) {
        return this.trainerDataService.updateExercise(
            updateExerciseData.trainerId,
            updateExerciseData.oldCategory,
            updateExerciseData.newCategory,
            updateExerciseData.oldName,
            updateExerciseData.newName
        );
    }
}
