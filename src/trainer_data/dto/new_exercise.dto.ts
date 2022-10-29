import { IsString } from 'class-validator';

export class NewExerciseDto {
  @IsString()
  athleteName: string;
  @IsString()
  exerciseName: string;
}
