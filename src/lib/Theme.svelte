<script lang="ts">
	import { browser } from '$app/env';
	import Icon from '$lib/Icon.svelte';
	import { onMount } from 'svelte';
	import { theme } from './stores';
	let on = false;
	if (browser) {
		on = ['light', 'dark'].includes(localStorage.getItem('theme'));
	}

	function handler(t: 'dark' | 'light') {
		// remove theme setting
		if ($theme === t && on) {
			on = false;
			localStorage.removeItem('theme');
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				theme.set('dark');
			} else {
				theme.set('light');
			}
		} else {
			on = true;
			localStorage.theme = t;
			theme.set(t);
		}
	}
</script>

<div class="text-center h-6">
	<span
		class:on
		class:theme-dark={$theme === 'dark'}
		class:theme-light={$theme === 'light'}
		class="toggle-container"
	>
		<span on:click={() => handler('dark')} class="toggle-button button-dark">
			<Icon name="moon.fill" />
		</span>
		<span on:click={() => handler('light')} class="toggle-button button-light">
			<Icon name="sun.max.fill" />
		</span>
	</span>
</div>

<style lang="scss">
	@import './mixins.scss';
	.toggle-container {
		cursor: pointer;
		@include typography(body1, 20);

		transition: opacity 75ms linear;
		& .toggle-button {
			opacity: 0.38;
		}

		&.theme-dark.on .button-dark {
			opacity: 1;
		}
		&.theme-light.on .button-light {
			opacity: 1;
		}
	}

	.toggle-button {
		position: relative;
		display: inline-block;
		transition: all 75ms linear;
		&:hover {
			color: white;
		}
		&::before {
			position: absolute;
			@apply inset-0;
			content: '';
			z-index: -1;
			transition: all 75ms linear;
			border-radius: 1px;
		}
		&:hover::before {
			background-color: black;
		}
	}
	:global(body.dark) {
		.toggle-button {
			&:hover::before {
				background-color: white;
			}
			&:hover {
				color: black;
			}
		}
	}
</style>
