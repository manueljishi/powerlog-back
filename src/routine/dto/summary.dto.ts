import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class SummaryDto {
  @IsDateString()
  day: Date;
  @IsString()
  athleteUid: string;
  @IsOptional()
  @IsString()
  athleteComments: string;
  @IsOptional()
  @IsNumberString()
  athleteFeelings: number;
}
