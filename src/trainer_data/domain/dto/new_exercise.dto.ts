import { IsEnum, IsString } from 'class-validator';
import { ExerciseCategories } from '../enums/categories.enum';

export class NewExerciseDto {
  @IsString()
  readonly trainerId: string;
  @IsString()
  readonly exerciseName: string;
  @IsEnum(ExerciseCategories)
  readonly exerciseCategory: ExerciseCategories;

}
