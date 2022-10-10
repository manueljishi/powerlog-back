import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WeekLog } from './weeklog.schema';

export type DayLogDocument = DayLog & Document;

class Exercise {
  exercise_name: string;
  sets: [number];
  rpe: [number];
  rir: [number];
  weight: [number];
  real_perceived_effort: [number];
  real_weight: [number];
  is_rpe: boolean;
  comments: string;
}

@Schema()
export class DayLog {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeekLog' }] })
  weekId: WeekLog;

  @Prop({
    required: true,
    enum: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  })
  weekDay: string;

  @Prop({ required: true })
  day: Date;

  @Prop({ required: true })
  exercises: Exercise[];
}

export const DayLogSchema = SchemaFactory.createForClass(DayLog);
