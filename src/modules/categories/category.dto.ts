import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string
}
