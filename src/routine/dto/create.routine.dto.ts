import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Exercise } from "src/classes/classes.general";

export class CreateRoutineDto {
  @ValidateNested({ each: true })
  @Type(() => DayLogDto)
  dayLogs: DayLogDto[];
}

export class DayLogDto {
  @IsDateString()
  day: Date;

  @ValidateNested({ each: true })
  @Type(() => Exercise)
  exercises: Exercise[];

  @IsString()
  athleteUid: string;

  @IsOptional()
  @IsBoolean()
  isBlockStart: boolean;

  @IsOptional()
  @IsBoolean()
  isBlockEnd: boolean;
}
