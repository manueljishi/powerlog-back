import { IsDateString, IsString } from 'class-validator';

export class GetDayRangeDto {
  @IsDateString()
  startDate: Date;
  @IsDateString()
  endDate: Date;
  @IsString()
  athleteUid: string;
}
