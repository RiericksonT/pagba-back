import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseRepository } from './firebase.service';
import { createPrivateKey } from 'crypto';

const b64_publicKey = Buffer.from(process.env.private_key).toString('base64');
const pemKey = createPrivateKey({
  key: `-----BEGIN PRIVATE KEY-----${process.env.private_key}-----END PRIVATE KEY-----`,
  format: 'pem', // this is the default
});

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: () => {
    const firebaseConfig = {
      type: process.env.firebase_type,
      project_id: process.env.project_id,
      api_key: process.env.api_key,
      authDomain: process.env.authDomain,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
      universe_domain: process.env.universe_domain,
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
