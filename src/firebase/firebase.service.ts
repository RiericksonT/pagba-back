import { Inject, Injectable } from '@nestjs/common';
import { app, storage } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  #db: FirebaseFirestore.Firestore;
  #storage: storage.Storage;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#storage = firebaseApp.storage();
  }

  async create(collection: string, data: any) {
    return this.#db.collection(collection).add(data);
  }

  async upload(bucket: string, files: Express.Multer.File[]) {
    const promises = files.map(async (file) => {
      const storageRef = this.#storage.bucket(bucket).file(file.originalname);

      await storageRef.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });
    });
    return Promise.all(promises);
  }
}
