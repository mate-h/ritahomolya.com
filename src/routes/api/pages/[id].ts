import type { RequestHandler } from '@sveltejs/kit';
import { jsonResponse } from '$lib/api';
import { firestore } from '../firestore';

import type { TextBlock } from "$lib/blocks/text/Text";
import type { ImageBlock } from "$lib/blocks/image/Image";

// Page should expose all useful parameters, like <svelte:head>, favicon, etc.
export type Page = {
	title: string;
	path: string;
	content: Block[];
};

export type Block = ({ type: 'text' } & TextBlock) | ({ type: 'image' } & ImageBlock);

// returns data from firebase
export const get: RequestHandler = async ({ params, query }) => {
	const id = params.id;
	if (!id || id === "") {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	const document = firestore.doc(`pages/${id}`);
	const doc = await document.get();
	if (!doc.data()) {
		return jsonResponse(404, {message: `Not found: pages/${id}`})
	}

	return jsonResponse(200, doc.data());
};
// removes record from firebase
export const del: RequestHandler = async ({ params }) => {
	const id = params.id;
	if (!id) {
		return jsonResponse(400, 'Bad Request: missing id');
	}
	const document = firestore.doc(`pages/${id}`);
	const doc = await document.get();
	if (!doc.data()) {
		return jsonResponse(404, {message: `Not found: pages/${id}`})
	}
	await document.delete();
	return jsonResponse(200, {message: `Deleted pages/${id}`});
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
	const document = firestore.doc(`pages/${id}`);
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
