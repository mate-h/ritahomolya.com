<script lang="ts" context="module">
	export async function load({ page, fetch, session, context }) {
		const url = `/api/datatypes`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					datatypes: await res.json()
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
	import Input from '$lib/Input.svelte';
	import JsonView from '$lib/JsonView.svelte';

	export let datatypes: { pages: any[] } = { pages: [] };
	let getUrl;
	$: {
		getUrl = (page) => {
			let url = page.url;
			if (page.params) {
				page.params.forEach((p) => {
					const val = page[p.toString()];
					if (val) url = url.replace(`[${p}]`, val);
				});
			}
			return url;
		};
	}
</script>

<h1>Pages</h1>
<p class="caption">Sitemap, routes</p>

{#each datatypes.pages as page}
	<p class="link">
		<a href={getUrl(page)}>{getUrl(page)}</a>
		{#if page.api || page.params}
			<ul class="list-disc ml-4">
				{#if page.params}
					{#each page.params as param}
						<li>
							param: <Input
								class="inline-block"
								bind:value={page[param.toString()]}
								type="text"
								placeholder={param.toString()}
							/>
						</li>
					{/each}
				{/if}
				{#if page.api}
					<li>
						api:
						<a href={page.api}>{page.api}</a>
					</li>
				{/if}
			</ul>
		{/if}
	</p>
{/each}

<h1 class="mt-4">Context</h1>

<JsonView object={datatypes} />

<style lang="scss">
	@import '../../lib/mixins.scss';
	h1 {
		@include typography(headline5);
	}
	.link {
		@include typography(subtitle2);
	}
	.caption {
		@include typography(caption);
		opacity: 0.54;
		@apply mt-2;
	}
	a {
		position: relative;
		z-index: 1;
		color: #007aff;
		text-decoration: underline;
	}
	:global(.dark) a {
		color: #0a84ff;
	}
</style>
