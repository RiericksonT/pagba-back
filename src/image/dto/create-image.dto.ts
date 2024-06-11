import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  url: string;

  @IsString()
  productId: string;
}
