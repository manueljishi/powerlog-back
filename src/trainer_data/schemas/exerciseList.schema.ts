import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExerciseName } from '../dto/exercises.dto';

export type ExerciseListDocument = ExerciseList & Document;

@Schema()
export class ExerciseList {
  @Prop({ required: true })
  trainerId: string;
  @Prop({ required: true })
  exerciseList: ExerciseName[];
}

export const ExerciseListSchema = SchemaFactory.createForClass(ExerciseList);
