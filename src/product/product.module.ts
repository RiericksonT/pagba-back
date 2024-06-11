import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/database/prisma.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
