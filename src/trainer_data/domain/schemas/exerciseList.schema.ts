import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExerciseName } from '../classes/exerciseName.class';
import { ExercisesList } from '../classes/exercisesList.class';
export type ExerciseListDocument = ExerciseList & Document;

@Schema()
export class ExerciseList {
  @Prop({ required: true })
  trainerId: string;
  @Prop({ required: true })
  exercises: ExercisesList[];
}

export const ExerciseListSchema = SchemaFactory.createForClass(ExerciseList);
