import { IsArray, IsString } from 'class-validator';
import { ExerciseName } from '../classes/exerciseName.class';

export class ExerciseListDto {
  @IsString()
  trainerId: string;
  @IsArray()
  exerciseList: ExerciseName[];
}
