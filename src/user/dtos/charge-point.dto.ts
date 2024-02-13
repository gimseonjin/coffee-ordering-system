import { IsInt, IsString, Min } from 'class-validator';

export class ChargePointDto {
  @IsString()
  userId: string;

  @IsInt()
  @Min(1)
  point: number;
}
