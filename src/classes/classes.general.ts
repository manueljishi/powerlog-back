import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class IConstraint {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  rpe?: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  rir?: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  fixedWeight?: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  percentage?: string;
}

export class Exercise {
  @IsString()
  exercise_name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  sets: number;

  @Type(() => String)
  @IsString({ each: true })
  reps: string[];

  @ValidateNested({ each: true })
  @Type(() => IConstraint)
  constraints: IConstraint[];

  @Type(() => Number)
  @IsNumber({}, { each: true })
  real_perceived_effort: number[];

  @Type(() => Number)
  @IsNumber({}, { each: true })
  real_weight: number[];

  @IsString()
  comments: string;
}
