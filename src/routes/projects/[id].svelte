<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		//console.log(page);
		const id = page.params.id;
		const url = `/api/pages/${id}`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					page: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import Page from '$lib/Page.svelte';

	import type { Page as PageType } from 'src/routes/api/pages/[id]';
	export let page: PageType;
	// Project view template
</script>

<Page {page}>
	<a href={`${page.path}/edit`} slot="header">Edit</a>
</Page>
