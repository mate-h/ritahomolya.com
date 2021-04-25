import { jsonResponse } from '$lib/api';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
// import all scoped modules here
import * as ProjectsModule from './projects/[id]';
import type SvelteComponentDev from 'svelte';


export type Route = { url: string; params?: string[]; api?: string };
function recourse(dir: string): string[] {
	const arr: string[] = [];
	let result;
	try {
		result = fs.readdirSync(dir);
		result.forEach((r) => {
			arr.push(...recourse(dir + '/' + r));
		});
	} catch (e) {
		if (e.code === 'ENOTDIR') {
			const exists = fs.existsSync(dir);
			if (exists) {
				arr.push(dir);
			}
		}
	}
	return arr;
}
export function getPages(): Route[] {
	// read folders and files recursively
	const dir = './src/routes';
	const pages = recourse(dir)
		.map((r) => r.replace('./src/routes', ''))
		.filter((f) => f.includes('.svelte'))
		.filter((r) => !r.includes('$layout'))
		.map((r) => r.replace('index.svelte', ''))
		.map((r) => r.replace('.svelte', ''))
		.map((r) => ({ url: r }))
		.map((o: Route) => {
			const u = o.url;
			const exists = fs.existsSync(`./src/routes/api${u}.ts`);
			if (exists) o = { ...o, api: `/api${u}` };

			if (u.includes('[') && u.includes(']')) {
				const params: string[] = u
					.split('[')
					.filter((r) => r.includes(']'))
					.map((r) => r.split(']')[0]);
				return { ...o, params };
			}
			return o;
		});
	return pages;
}

export function getBlocks() {
	const files = recourse('./src/lib/blocks');
	return files;
}
// returns a list of routes as a flattened hierarchy
export const get: RequestHandler = () => {
	const pages = getPages();
	const blocks = getBlocks();
	const datatypes = [
		ProjectsModule.datatype
	]
	return jsonResponse(200, { datatypes, blocks });
};
