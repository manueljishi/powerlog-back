import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WeekLogDocument = WeekLog & Document;

@Schema()
export class WeekLog {
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const WeekLogSchema = SchemaFactory.createForClass(WeekLog);
