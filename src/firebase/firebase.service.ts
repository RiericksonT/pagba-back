import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Storage } from 'firebase-admin/lib/storage/storage';

@Injectable()
export class FirebaseRepository {
  #db: FirebaseFirestore.Firestore;
  #collection: Storage;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
    this.#collection = firebaseApp.storage();
  }

  async create(collection: string, data: any) {
    return this.#db.collection(collection).add(data);
  }

  async upload(bucket: string, file: any) {
    return this.#collection.bucket(bucket).upload(file);
  }
}
