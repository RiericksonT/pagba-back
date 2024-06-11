import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    ImageModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
