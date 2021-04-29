global.exports = {}
import crypto from 'crypto';
import { encrypted } from '../../service-account.enc';
import admin from 'firebase-admin';

const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env['GOOGLE_ENCRYPTED_KEY'],
  process.env['GOOGLE_ENCRYPTED_IV']
);

export const getDecryptedSecret = (): admin.ServiceAccount => {
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

const serviceAccount = getDecryptedSecret();
export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const firestore = app.firestore();
