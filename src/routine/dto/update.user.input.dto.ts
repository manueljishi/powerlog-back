import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserInputDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  exerciseIndex: number;

  //0 for real_weight, 1 for real_effort
  @IsNumber()
  @Transform(({ value }) => Number(value))
  dataType: number;

  @Type(() => Number)
  @IsNumber({}, { each: true })
  data: number[];
}
