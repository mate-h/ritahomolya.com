global.exports = {}
import { Firestore } from '@google-cloud/firestore';
export const firestore = new Firestore();

import admin from 'firebase-admin';
export const app = admin.initializeApp({
  credential: admin.credential.applicationDefault()
});