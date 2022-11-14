import { DayLog } from '../schemas/daylog.schema';
import { DayLogDto, Exercise, IConstraint } from './create.routine.dto';

export class DayLogResponseDto extends DayLogDto {
  constructor(dayLog: DayLog) {
    super();
    this.day = dayLog.day;
    this.athleteUid = dayLog.athleteUid;
    this.exercises = [...dayLog.exercises];
    this.isBlockStart = dayLog.isBlockStart;
    this.isBlockEnd = dayLog.isBlockEnd;
  }

  parseExercises() {
    this.exercises.forEach((exercise) => {
      exercise.constraints = this.castConstraints(exercise.constraints);
    });
  }

  castConstraints(constraints: IConstraint[]): IConstraint[] {
    let parsedConstraints: IConstraint[] = [];
    constraints.map((constraint) => {
      //create new IConstraint object
      let newConstraint: IConstraint = {};
      const keys = Object.keys(constraint);
      keys.forEach((key) => {
        newConstraint[key] = constraint[key].toString();
      });
      parsedConstraints.push(newConstraint);
    });
    return parsedConstraints;
  }
}
