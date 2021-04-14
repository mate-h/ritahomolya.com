<script lang="ts">
	import rounded from '$lib/rounded';
	import Loading from './Loading.svelte';

	export let type;
	export let title;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	let className;
	export { className as class };

	function handler() {}
</script>

<button {disabled} {type} {title} class:disabled class:loading class={className} on:click={handler}>
	<div class="root" use:rounded={{ radius: 32 }}>
		<div class="edge" use:rounded={{ radius: 28 }} />
		<div class="foreground" />
		<span><slot /></span>
	</div>
	{#if loading}
		<div class="absolute inset-0 flex justify-center items-center">
			<Loading />
		</div>
	{/if}
</button>

<style lang="scss">
	@import './mixins.scss';

	// hover-dark: 0.08;
	// focus-dark: 0.24;
	// pressed-dark: 0.32;

	.disabled,
	.loading {
		cursor: auto;
		pointer-events: none;
		& > .root {
			background-color: #888888;
		}
		& > .root > .edge {
			background-color: transparent !important;
		}
		color: rgba(255, 255, 255, 0.38);
	}
	.loading {
		color: white;
		& > .root > span {
			visibility: hidden;
		}
	}

	button {
		transform: translateY(3px);
		height: 2rem;
		color: white;
		position: relative;

		&:focus {
			outline: none;
		}
		&:hover > .root > .edge {
			background-color: rgba(255, 255, 255, 0.08);
		}
		&:focus > .root > .edge {
			background-color: rgba(255, 255, 255, 0.24);
		}
		&:active > .root > .edge {
			background-color: rgba(255, 255, 255, 0.32);
		}
	}

	.root {
		@apply px-2;
		height: 100%;
		position: relative;
		background-color: #007aff;
		transition: background-color 75ms linear;
	}
	.foreground {
		@include fill-parent;
		transition: background-color 75ms linear;
		background-color: rgba(255, 255, 255, 0);
		z-index: 1;
	}
	.edge {
		margin: 2px;
		@include fill-parent;
		background-color: #007aff;
		transition: background-color 75ms linear;
	}
	span {
		@include typography(subtitle2, 21);
		position: relative;
		z-index: 1;
	}
</style>
