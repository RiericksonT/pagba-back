import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  description?: string | null;

  @IsNumber()
  price: number;

  @IsString()
  categoryId: string;

  @IsString({ each: true })
  @IsOptional()
  imagesIds?: string[];
}
