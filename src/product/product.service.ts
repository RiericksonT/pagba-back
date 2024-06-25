import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { FirebaseRepository } from 'src/firebase/firebase.service';

interface ImageInfo {
  filename: string;
  url: string;
}

@Injectable()
export class ProductService {
  constructor(
    private prismaService: PrismaService,
    private firebaseRepository: FirebaseRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    createProductDto.price = parseFloat(createProductDto.price as any);
    return await this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        description: createProductDto.description,
        images: {
          create: createProductDto.imagesIds.map((image) => ({
            url: image,
          })),
        },
        category: {
          connect: {
            id: createProductDto.categoryId,
          },
        },
      },
    });
  }

  async findAll() {
    const products = await this.prismaService.product.findMany({
      include: {
        images: true,
        category: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map((img) => img.url),
    }));
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

  async uploadImage(imagesIds: Express.Multer.File[]): Promise<ImageInfo[]> {
    return await this.firebaseRepository.upload('products', imagesIds);
  }
}
