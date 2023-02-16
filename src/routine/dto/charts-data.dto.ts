import { IConstraint } from "src/classes/classes.general";

export class ChartsDataDto {
  athleteUid: string;
  exercise_name: string;
  data: ChartsDataInfo[];
}

export class ChartsDataInfo {
  day?: Date;
  block?: number;
  real_weight?: number;
  reps?: number;
  constraint?: IConstraint;
  estimated_weight?: number;
}
