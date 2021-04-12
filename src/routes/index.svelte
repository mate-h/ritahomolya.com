<script lang="ts">
	import rounded from '$lib/rounded';
	import Button from '$lib/Button.svelte';
	import Thumbnail from '$lib/Thumbnail.svelte';
</script>

<main class="container mx-auto">
	<div use:rounded class="edge" />
	<div use:rounded={{ radius: 30 }} class="edge-1" />
	<div class="overline">Graphic Design • Motion Graphic Design</div>
	<h1>Rita Homolya</h1>
	<Thumbnail />
	<div class="mask" />
	<Button class="mt-6">Contact</Button>
	<footer>
		Made with {'<3'} in Canada,
		<a href="https://github.com/mate-h/ritahomolya.com" target="_blank" rel="noopener noreferrer"
			>contribute here</a
		>
	</footer>
	<div class="dotgrid" />
</main>

<style lang="scss">
	@import '../lib/mixins.scss';

	:root {
		background-color: #fafafa;
	}

	main {
		border-radius: 2px;
		position: relative;
		text-align: center;
		//box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
		@apply py-8;
		min-height: calc(100vh + 16rem);
		//transform: rotate3d(0.5, -0.866, 0, 15deg) rotate(1deg);
		box-shadow: 2em 4em 6em -2em rgba(0, 0, 0, 0.12), 1em 2em 3.5em -2.5em rgba(0, 0, 0, 0.12);
		border-radius: 0.5em;
		margin-top: 1rem;
		margin-bottom: 4rem;
	}
	.edge {
		@include fill-parent;
		background-color: #e0e0e0;
		z-index: -1;
	}
	.edge-1 {
		@include fill-parent;
		@apply bg-white;
		z-index: -1;
		margin: 1px;
	}
	.mask {
		position: absolute;
		top: calc(279px + 6rem);
		bottom: 7px;
		left: 7px;
		right: 7px;
		background-color: white;
		z-index: -1;
	}
	.dotgrid {
		@include fill-parent;
		background-image: url('data:image/svg+xml;utf8,<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(0,0,0,0.24)" d="M.5.5h1v1h-1z" fill-rule="evenodd"/></svg>');
		background-repeat: repeat;
		pointer-events: none;
		transform: translateY(-1px);
		margin: 7px;
		z-index: 10;
	}

	.overline {
		@include typography(overline);
		color: rgba(0, 0, 0, 0.76);
	}

	footer {
		@include typography(caption);
		position: absolute;
		bottom: 1rem;
		left: 0;
		right: 0;
		& > a {
			color: #007aff;
			text-decoration: underline;
		}
	}

	h1 {
		@include typography(headline3, 48);
		letter-spacing: -0.07rem;
		position: relative;
		z-index: 1;
	}
</style>
