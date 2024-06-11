import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptService } from 'src/auth/middleware/encrypt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EncryptService],
  exports: [UserService],
})
export class UserModule {}
