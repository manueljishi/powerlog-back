import { ExerciseName } from "./exerciseName.class";
import { ExerciseCategories } from "../enums/categories.enum";

export class ExercisesList {
    exercises: {
        categoryName: ExerciseCategories;
        elements: ExerciseName;
    }[]
}