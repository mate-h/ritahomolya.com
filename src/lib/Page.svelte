<script lang="ts">
	import Image from '$lib/blocks/image/Image.svelte';
	import Text from '$lib/blocks/text/Text.svelte';
	import type { Page } from 'src/routes/api/pages/[id]';

	export let page: Page;
	export let editing: boolean = false;
</script>

<svelte:head>
	<title>{page.title}</title>
</svelte:head>

<main class="container mx-auto px-4 md:px-6">
	<slot name="header" />
	{#each page.content as block}
		{#if block.type === 'text'}
			<Text {editing} {...block}>
				{block.node}
			</Text>
		{:else if block.type === 'image'}
			<Image {editing} {...block} />
		{/if}
	{/each}
	<slot name="footer" />
</main>
