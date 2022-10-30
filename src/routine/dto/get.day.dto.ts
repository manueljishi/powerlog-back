import { IsDateString, IsString } from 'class-validator';

export class GetDayDto {
  @IsDateString()
  date: Date;
  @IsString()
  athleteName: string;
}
