<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	export let pinned = false;
	export let top = 0.75;
	export let left = 0.5;
	const dispatch = createEventDispatcher();

	function pinHandler(e: Event) {
		pinned = !pinned;
		dispatch('change', pinned);
	}
</script>

<span style={`--top: ${top}rem; --left: ${left}rem`} class="root">
	<span class="body2">
		<span on:click={pinHandler} class="active" {...$$restProps}>
			<Icon style="opacity: 0.54" name={pinned ? 'pin.fill' : 'pin.slash.fill'} />
		</span>
	</span>
</span>

<style lang="scss">
	@import '../../lib/mixins.scss';
	.root {
		user-select: none;
		position: absolute;
		top: var(--top);
		left: var(--left);
		height: 1.5rem;
	}
	.body2 {
		@include typography(body2);
		position: relative;
	}
	.active {
		cursor: pointer;
		@include active('light');
	}
	:global(.dark) .active {
		@include active('dark');
	}
</style>
