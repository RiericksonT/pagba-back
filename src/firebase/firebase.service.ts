import { Injectable } from '@nestjs/common';
import admin, { storage } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  private readonly config: any;
  private readonly storage: storage.Storage;

  constructor() {
    this.config = {
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
      universe_domain: process.env.universe_domain,
    };
    admin.initializeApp({
      credential: admin.credential.cert(this.config),
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
