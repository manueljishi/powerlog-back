import { IsEnum, IsString } from "class-validator";
import { ExerciseCategories } from "../enums/categories.enum";

export class UpdateExerciseDto {
    @IsString()
    readonly trainerId: string;
    @IsEnum(ExerciseCategories)
    readonly oldCategory: ExerciseCategories;
    @IsEnum(ExerciseCategories)
    readonly newCategory: ExerciseCategories;
    @IsString()
    readonly oldName: string;
    @IsString()
    readonly newName: string;
}