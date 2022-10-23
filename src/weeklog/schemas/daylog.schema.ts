import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WeekLog } from './weeklog.schema';

export type DayLogDocument = DayLog & Document;

export interface IConstraint {
  rpe: string;
  rir: string;
  fixedWeight: string;
  percentage: string;
}

class Exercise {
  exercise_name: string;
  sets: [number];
  constraints: IConstraint[];
  real_perceived_effort: [number];
  real_weight: [number];
  comments: string;
}

@Schema()
export class DayLog {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeekLog' }] })
  weekId: WeekLog;

  @Prop({
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6],
  })
  weekDay: number;

  @Prop()
  day: Date;

  @Prop({ required: true })
  exercises: Exercise[];
}

export const DayLogSchema = SchemaFactory.createForClass(DayLog);
