import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ImageService {
  constructor(private prismaService: PrismaService) {}

  create(createImageDto: CreateImageDto) {
    return this.prismaService.image.create({
      data: createImageDto,
    });
  }

  findAll() {
    return this.prismaService.image.findMany();
  }

  findOne(id: string) {
    return this.prismaService.image.findUnique({
      where: { id },
    });
  }

  update(id: string, updateImageDto: UpdateImageDto) {
    return this.prismaService.image.update({
      where: { id },
      data: updateImageDto,
    });
  }

  remove(id: string) {
    return this.prismaService.image.delete({
      where: { id },
    });
  }
}
