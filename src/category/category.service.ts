import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateCategoryDto) {
    try {
      return await this.prismaService.category.create({ data });
    } catch (error) {
      throw new HttpException(error.message.replace(/\n/g, ''), 400);
    }
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
