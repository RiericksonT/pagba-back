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
  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
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

  uploadImage(imagesIds: any[]) {
    for (const imageId of imagesIds) {
      const flename = imageId.originalname + Date.now();
      this.firebaseRepository.upload('products', flename);
    }
  }
}
