import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IConstraint } from '../dto/create.routine.dto';

export type DayLogDocument = DayLog & Document;

class Exercise {
  exercise_name: string;
  sets: [number];
  reps: [number];
  constraints: IConstraint[];
  real_perceived_effort: [number];
  real_weight: [number];
  comments: string;
}

@Schema()
export class DayLog {
  @Prop({ required: true })
  day: Date;

  @Prop({ required: true })
  exercises: Exercise[];
}

export const DayLogSchema = SchemaFactory.createForClass(DayLog);
