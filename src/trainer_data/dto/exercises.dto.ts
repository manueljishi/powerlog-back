import { IsArray, IsString } from 'class-validator';

export class ExerciseName {
  @IsArray()
  exerciseList: { exercise; '' }[];
}

export class ExerciseListDto {
  @IsString()
  trainerId: string;
  @IsArray()
  exerciseList: ExerciseName[];
}
