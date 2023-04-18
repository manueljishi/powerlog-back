import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ExerciseListDocument = ExerciseList & Document;

@Schema()
export class ExerciseList {
  @Prop({ required: true })
  trainerId: string;
  @Prop({ required: true })
  squat: string[]
  @Prop({ required: true })
  bench_press: string[]
  @Prop({ required: true })
  deadlift: string[]
  @Prop({ required: true })
  knee_dominant: string[]
  @Prop({ required: true })
  hip_dominant: string[]
  @Prop({ required: true })
  push: string[]
  @Prop({ required: true })
  pull: string[]
  @Prop({ required: true })
  complementary: string[]
}

export const ExerciseListSchema = SchemaFactory.createForClass(ExerciseList);
