export interface ExerciseName {
  exerciseList: { exercise; '' }[];
}

export class ExerciseListDto {
  athleteName: string;
  exerciseList: ExerciseName[];
}
