import { Injectable } from '@nestjs/common';
import admin, { storage } from 'firebase-admin';

interface ImageInfo {
  filename: string;
  url: string;
}

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
      credential: admin.credential.cert(
        './pagba-fa1af-firebase-adminsdk-82kbi-283fd38440.json',
      ),
    });
    this.storage = admin.storage();
  }

  async upload(
    bucket: string,
    files: Express.Multer.File[],
  ): Promise<ImageInfo[]> {
    const images: ImageInfo[] = [];
    const promises = files.map(async (file) => {
      const fileName = file.originalname.replace(/\s+/g, '');
      const dateStr = new Date();
      const formattedDate =
        dateStr.getFullYear().toString() +
        (dateStr.getMonth() + 1).toString().padStart(2, '0') +
        dateStr.getDate().toString().padStart(2, '0') +
        dateStr.getHours().toString().padStart(2, '0') +
        dateStr.getMinutes().toString().padStart(2, '0') +
        dateStr.getSeconds().toString().padStart(2, '0');
      const storageRef = this.storage
        .bucket('gs://pagba-fa1af.appspot.com/')
        .file(fileName + formattedDate + '.jpg');

      await storageRef.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      const publicUrl = `https://storage.googleapis.com/${'pagba-fa1af'}/${fileName}${formattedDate}.jpg`;

      // Adicionar a informação da imagem ao array
      images.push({
        filename: storage.name,
        url: publicUrl,
      });
    });

    await Promise.all(promises);

    return images;
  }
}
