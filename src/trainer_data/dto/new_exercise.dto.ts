import { IsString } from 'class-validator';

export class NewExerciseDto {
  @IsString()
  trainerId: string;
  @IsString()
  exerciseName: string;
}
