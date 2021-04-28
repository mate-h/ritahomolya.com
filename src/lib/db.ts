import {firestore} from './firebase';
import type {DocumentData} from '@google-cloud/firestore';

export async function get<T extends DocumentData>(path: string): Promise<T|undefined> {
  const document = firestore.doc(path);
	const doc = await document.get();
  return doc.data() as T;
}

export default { get };