import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  productsIds?: string[];
}
