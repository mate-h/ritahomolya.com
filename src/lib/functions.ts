import {firestore} from './firebase';
import type { Request, Response } from '@sveltejs/kit';
import { jsonResponse } from './responses';

export type TypedResponse<T> = Response & {
	body?: T;
};

type KeyVal = Record<string, unknown>

export async function postDocument<Context = KeyVal, Body = unknown, ResponseBody = KeyVal>(
	{ params, body }: Request<Context, Body>,
	collection: string
): Promise<TypedResponse<ResponseBody>> {
	const id = params.id;
	const data = JSON.parse(body.toString()) as Partial<FirebaseFirestore.DocumentData>;
	if (!id) {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	if (!body) {
		return jsonResponse(400, 'Bad Request: missing body');
	}
	const document = firestore.doc(`${collection}/${id}`);
	let doc = await document.get();
	let status = 200;
	if (!doc.data()) {
		// create new document
		status = 201;
		await document.set(data);
	} else {
		// update existing document
		await document.update(data);
	}
	doc = await document.get();

	return jsonResponse(status, doc.data());
}
