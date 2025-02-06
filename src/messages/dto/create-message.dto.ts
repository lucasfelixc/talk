import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly content: string;

  @IsOptional()
  @IsBoolean()
  readonly read: boolean;

  @IsPositive()
  fromId: number;

  @IsPositive()
  toId: number;
}
