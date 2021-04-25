<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { viewMode } from './stores';
	import Icon from './Icon.svelte';
	let type: 'solid' | 'wireframe' = 'solid';
	const dispatch = createEventDispatcher();
	function handler(t: 'solid' | 'wireframe') {
		type = t;
		viewMode.update((m) => ({ ...m, type: t }));
	}
	let followMode = $viewMode.mode === 'follow';
	$: {
		followMode = $viewMode.mode === 'follow';
	}
	function modeHandler() {
		viewMode.update((m) => ({ ...m, mode: !followMode ? 'follow' : 'orbit' }));
	}
</script>

<span class="root">
	<span on:click={() => handler('solid')} class:active={type === 'solid'} class="toggle-button">
		<Icon name="circle.fill" />
	</span>
	<span
		on:click={() => handler('wireframe')}
		class:active={type === 'wireframe'}
		class="toggle-button"
	>
		<Icon name="globe" />
	</span>
	<!-- <span on:click={modeHandler}>
		<Icon name={followMode ? 'eye.fill' : 'eye'} />
	</span> -->
</span>

<style lang="scss">
	@import './mixins.scss';
	.root {
		position: absolute;
		bottom: 0;
		transform: translateX(-1rem);
		cursor: pointer;
		z-index: 30;
		& > span {
			@include typography(body1, 20);
			opacity: 0.38;
			transition: opacity 150ms linear;
			&:hover {
				opacity: 0.87;
			}
		}
		& > .active {
			opacity: 1;
		}
	}
</style>
