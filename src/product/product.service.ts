import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { FirebaseRepository } from 'src/firebase/firebase.service';

@Injectable()
export class ProductService {
  constructor(
    private prismaService: PrismaService,
    private firebaseRepository: FirebaseRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    createProductDto.price = parseFloat(createProductDto.price as any);
    return await this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  uploadImage(imagesIds: Express.Multer.File[]) {
    return this.firebaseRepository.upload('products', imagesIds);
  }
}
