import { ExerciseName } from "../classes/exerciseName.class";
import { ExerciseCategories } from "../enums/categories.enum";

export class ExercisesListDto {
    exercises: {
        categoryName: ExerciseCategories;
        elements: ExerciseName;
    }[]
}