<script lang="ts">
	import type { Typography } from './Text';

	// single line or multi line
	export let node: string;
	export let typography: Typography = 'body2';
	export let lineHeight: number;
	export let editing: boolean = false;

	// fetch props from SSR cache prerender
	// through an API
</script>

{#if editing}
	<p>
		<input bind:value={node} />
	</p>
{:else}
	<p class:editing {...$$restProps}>
		<slot />
	</p>
{/if}

<style>
	.editing {
		@apply ring-1;
		--tw-ring-color: rgba(0, 0, 0, 0.12);
	}
</style>
