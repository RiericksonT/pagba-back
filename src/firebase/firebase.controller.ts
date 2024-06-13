import { Controller } from '@nestjs/common';
import { FirebaseRepository } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseRepository) {}
}
