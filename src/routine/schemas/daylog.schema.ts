import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IConstraint } from "src/classes/classes.general";

export type DayLogDocument = DayLog & Document;

class Exercise {
  exercise_name: string;
  sets: number;
  reps: string[];
  constraints: IConstraint[];
  real_perceived_effort: number[];
  real_weight: number[];
  comments: string;
}

@Schema()
export class DayLog {
  @Prop({ required: true })
  day: Date;

  @Prop({ required: true })
  exercises: Exercise[];

  @Prop({ required: true })
  athleteUid: string;

  @Prop({ required: false })
  isBlockStart: boolean;

  @Prop({ required: false })
  isBlockEnd: boolean;

  @Prop({ required: false })
  athleteComments: string;

  @Prop({ required: false })
  athleteFeelings: number;
}

export const DayLogSchema = SchemaFactory.createForClass(DayLog);
