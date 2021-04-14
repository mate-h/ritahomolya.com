<script lang="ts">
	import rounded from '$lib/rounded';
	import Thumbnail from '$lib/Thumbnail.svelte';
	import Language from '$lib/Language.svelte';
	import { t } from '$lib/message';
	import { language } from '$lib/stores';
	import ContactForm from '$lib/ContactForm.svelte';
</script>

<main class="container mx-auto">
	<div use:rounded class="edge" />
	<div use:rounded={{ radius: 30 }} class="edge-1" />
	<p class="overline">{t('index.overline', $language)}</p>
	<h1>Rita Homolya</h1>
	<Thumbnail />
	<div class="mask" />
	<ContactForm />
	<footer>
		<Language />
		{t('index.footer', $language)}{' — '}
		<a href="https://github.com/mate-h/ritahomolya.com" target="_blank" rel="noopener noreferrer"
			>GitHub</a
		>
	</footer>
	<!-- <Dialog /> -->
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
		@apply py-8;
		min-height: calc(100vh + 16rem);
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
		top: calc(280px + 6rem);
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
		// transform: translateY(-1px);
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
