import type { RequestHandler } from '@sveltejs/kit';
import { jsonResponse } from '$lib/api';
global.exports = {}
import { Firestore } from '@google-cloud/firestore';
const firestore = new Firestore();

export type Project = {
	title: string;
	content: string;
	thumbnail?: string;
};
// returns data from firebase
export const get: RequestHandler = async ({ params }) => {
	const id = params.id;
	console.log(params);
	if (!id || id === "") {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	const document = firestore.doc(`projects/${id}`);
	const doc = await document.get();
	if (!doc.data()) {
		return jsonResponse(404, {message: `Not found: projects/${id}`})
	}

	return jsonResponse(200, doc.data());
};
// removes record from firebase
export const del: RequestHandler = async ({ params }) => {
	const id = params.id;
	if (!id) {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	const document = firestore.doc(`projects/${id}`);
	const doc = await document.get();
	if (!doc.data()) {
		return jsonResponse(404, {message: `Not found: projects/${id}`})
	}
	await document.delete();
	return jsonResponse(200, {message: `Deleted projects/${id}`});
}
// adds or updates data in firebase
export const post: RequestHandler = async ({ params, body }) => {
	const id = params.id;
	const data = body as Partial<FirebaseFirestore.DocumentData>;
	if (!id) {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	if (!body) {
		return jsonResponse(400, 'Bad Request: missing body');
	}
	const document = firestore.doc(`projects/${id}`);
	let doc = await document.get();
	if (!doc.data()) {
		// create new document
		await document.set(data);
	}
	else {
		// update existing document
		await document.update(data);
	}
	doc = await document.get();
	
	return jsonResponse(200, doc.data());
}
