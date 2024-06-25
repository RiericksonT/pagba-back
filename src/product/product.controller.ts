import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  InternalServerErrorException,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('imagesIds', 10)) // 10 é o número máximo de arquivos permitidos
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      if (files && files.length > 0) {
        const imgs = await this.productService.uploadImage(files);
        createProductDto.imagesIds = imgs.map((img) => img.url);
      }
      return await this.productService.create(createProductDto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new InternalServerErrorException('Erro ao criar produto');
    }
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
