import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExerciseName } from '../classes/exerciseName.class';
import { ExercisesList } from '../classes/exercisesList.class';
export type ExerciseListDocument = ExercisesSchema & Document;

@Schema()
export class ExercisesSchema {
  @Prop({ required: true })
  trainerId: string;
  @Prop({ required: true })
  exercises: ExercisesList[];
}

export const ExerciseListSchema = SchemaFactory.createForClass(ExercisesSchema);
