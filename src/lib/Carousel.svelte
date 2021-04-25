<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	export let index = 0;
	export let length = 2;
	const dispatch = createEventDispatcher();
	function handler(which: 'left' | 'right') {
		let newIndex = index;
		if (which === 'left') newIndex -= 1;
		else if (which === 'right') newIndex += 1;
		if (newIndex > length - 1) newIndex = 0;
		else if (newIndex < 0) newIndex = length - 1;
		index = newIndex;
		dispatch('change', newIndex);
	}
</script>

<div class="root">
	<div on:click={() => handler('left')} class="left">
		<Icon name="arrow.left" />
	</div>
	<div on:click={() => handler('right')} class="right">
		<Icon name="arrow.right" />
	</div>
</div>

<style lang="scss">
	.root {
		z-index: 30;
		position: absolute;
		bottom: 50%;
		left: 0;
		right: 0;
	}
	@mixin button {
		position: absolute;
		cursor: pointer;
		opacity: 0.38;
		transition: opacity 150ms linear;
		&:hover {
			opacity: 0.87;
		}
	}
	.left {
		left: 0;
		@include button;
	}
	.right {
		right: 0;
		@include button;
	}
</style>
