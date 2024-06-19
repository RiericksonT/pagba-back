import { Injectable } from '@nestjs/common';
import admin, { storage } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  private readonly storage: storage.Storage;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        './src/firebase/pagba-fa1af-f2d24300e941.json',
      ),
    });
    this.storage = admin.storage();
  }

  async upload(bucket: string, files: Express.Multer.File[]) {
    const promises = files.map(async (file) => {
      const storageRef = this.storage.bucket(bucket).file(file.originalname);

      await storageRef.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });
    });
    return Promise.all(promises);
  }
}
