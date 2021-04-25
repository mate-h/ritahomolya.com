<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		//console.log(page);
		//console.log(page);
		const id = page.params.id;
		const url = `/api/pages/${id}`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					id,
					route: page,
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
	import type { Block, Page as PageType } from 'src/routes/api/pages/[id]';
	import Icon from '$lib/Icon.svelte';

	export let id: string;
	export let page: PageType;
	export let route;
	function add(type: Block['type']) {
		console.log('click', type);
		let block: Block;
		if (type === 'text') block = { type, node: 'Hello world' };
		if (type === 'image') block = { type, src: '/ai-me.png', alt: 'Me' };

		page = { ...page, content: [...page.content, block] };
	}
	function publish(e: Event) {
		e.preventDefault();
		fetch(`/api/pages/${id}`, {
			method: 'POST',
			body: JSON.stringify(page)
		}).then(() => (window.location.href = page.path));
	}
</script>

<Page editing={true} {page}>
	<svelte:fragment slot="header">
		<p>{id}</p>
		<form on:submit={publish}>
			<button type="submit">Publish</button>
		</form>
		<code>{JSON.stringify(page, null, 2)}</code>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<p>Add new block</p>
		<ul>
			<li on:click={() => add('text')}><p><Icon name="textbox" class="mr-2" />Text</p></li>
			<li on:click={() => add('image')}><p><Icon name="photo" class="mr-2" />Image</p></li>
		</ul>
	</svelte:fragment>
</Page>

<style lang="scss">
	@import '../../../lib/mixins.scss';
	p {
		@include typography(caption);
	}
	li {
		width: 7rem;
		// height: 2rem;
		@include active('light');
		position: relative;
		cursor: pointer;
		padding-left: 1rem;
		padding-right: 1rem;
		margin-bottom: 0.75rem;
	}
	li > p {
		@include typography(subtitle2, 24);
	}
</style>
