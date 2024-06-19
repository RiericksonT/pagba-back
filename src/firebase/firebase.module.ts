import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseRepository } from './firebase.service';
@Module({
  imports: [ConfigModule],
  providers: [FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
