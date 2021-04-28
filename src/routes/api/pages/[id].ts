import type { RequestHandler } from '@sveltejs/kit';
import { jsonResponse } from '$lib/responses';
import db from '$lib/db';

import type { TextBlock } from "$lib/blocks/text/Text";
import type { ImageBlock } from "$lib/blocks/image/Image";
import { postDocument } from '$lib/functions';

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
	const data = await db.get(`pages/${id}`);
	if (!data) {
		return jsonResponse(404, {message: `Not found: pages/${id}`})
	}

	return jsonResponse(200, data);
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
export const post: RequestHandler = async (req) => {
	return await postDocument(req, 'pages');
}
