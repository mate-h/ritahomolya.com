import type { RequestHandler } from '@sveltejs/kit';
import { jsonResponse } from '$lib/responses';
import { firestore } from '$lib/firebase';
import type { Block } from '../pages/[id]';

export type Template = {
	path: string, // '/projects'
	type: 'view'|'edit'|'list-item'|'gallery-item',
	class: 'page'|'component',
	meta?: {
		[key: string]: string
	},
	content: {
		[key: string]: Block // key of projects
	}
};

// returns data from firebase
export const get: RequestHandler = async ({ params, query }) => {
	const id = params.id;
	if (!id || id === "") {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	const document = firestore.doc(`templates/${id}`);
	const doc = await document.get();
	if (!doc.data()) {
		return jsonResponse(404, {message: `Not found: templates/${id}`})
	}

	return jsonResponse(200, doc.data());
};
// removes record from firebase
export const del: RequestHandler = async ({ params }) => {
	const id = params.id;
	if (!id) {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	const document = firestore.doc(`templates/${id}`);
	const doc = await document.get();
	if (!doc.data()) {
		return jsonResponse(404, {message: `Not found: templates/${id}`})
	}
	await document.delete();
	return jsonResponse(200, {message: `Deleted templates/${id}`});
}
// adds or updates data in firebase
export const post: RequestHandler = async ({ params, body }) => {
	const id = params.id;
	const data = JSON.parse(body.toString()) as Partial<FirebaseFirestore.DocumentData>;
	if (!id) {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	if (!body) {
		return jsonResponse(400, 'Bad Request: missing body');
	}
	const document = firestore.doc(`templates/${id}`);
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
