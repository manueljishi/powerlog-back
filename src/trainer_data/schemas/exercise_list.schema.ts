import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExerciseName } from '../dto/exercises.dto';

export type ExerciseListDocument = ExerciseList & Document;

@Schema()
export class ExerciseList {
  @Prop({ required: true })
  athleteName: string;
  @Prop({ required: true })
  exercise_list: ExerciseName[];
}

export const ExerciseListSchema = SchemaFactory.createForClass(ExerciseList);
