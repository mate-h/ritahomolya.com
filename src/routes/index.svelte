<script lang="ts">
	import rounded from '$lib/rounded';
	import Thumbnail from '$lib/Thumbnail.svelte';
	import Language from '$lib/Language.svelte';
	import { t } from '$lib/message';
	import { language } from '$lib/stores';
	import ContactForm from '$lib/ContactForm.svelte';
	import Projects from '$lib/Projects.svelte';
	import Theme from '$lib/Theme.svelte';
</script>

<main class="container mx-auto dark:text-white">
	<div use:rounded class="edge" />
	<div use:rounded={{ radius: 30 }} class="edge-1" />

	<Theme />
	<p class="overline">{t('index.overline', $language)}</p>
	<h1>Rita Homolya</h1>
	<Thumbnail />
	<ContactForm />
	<Projects />
	<footer>
		<hr class="mx-6 md:mx-8 pb-8" />
		<Language />
		{t('index.footer', $language)}{' — '}
		<a href="https://github.com/mate-h/ritahomolya.com" target="_blank" rel="noopener noreferrer"
			>GitHub</a
		>
		{' • '}<a href="/admin">Admin</a>
	</footer>
	<!-- <Dialog /> -->
	<div use:rounded={{ radius: 30 }} class="img" />
	<div class="dotgrid" />
</main>

<style lang="scss">
	@import '../lib/mixins.scss';

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
	:global(.dark) main {
		box-shadow: 2em 4em 6em -2em rgba(0, 0, 0, 0.54), 1em 2em 3.5em -2.5em rgba(0, 0, 0, 0.54);
	}

	.edge {
		@include fill-parent;
		background-color: #e0e0e0;
		z-index: -1;
	}
	:global(.dark) .edge {
		background-color: rgba(255, 255, 255, 0.54);
	}
	.edge-1 {
		@include fill-parent;
		@apply bg-white;
		z-index: -1;
		margin: 1px;
	}
	.img {
		@include fill-parent;
		background-image: url('/paper.png');
		background-repeat: repeat;
		mix-blend-mode: multiply;
		pointer-events: none;
		opacity: 0.24;
	}
	:global(.dark) .img {
		filter: invert(1);
		mix-blend-mode: screen;
		opacity: 0.12;
	}
	:global(.dark) .edge-1 {
		background-color: #2b2b2b;
	}
	.dotgrid {
		@include fill-parent;
		background-image: url('data:image/svg+xml;utf8,<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(0, 0, 0, 0.24)" d="M.5.5h1v1h-1z" fill-rule="evenodd"/></svg>');
		background-repeat: repeat;
		pointer-events: none;
		// transform: translateY(-1px);
		margin: 7px;
		z-index: 10;
	}
	:global(.dark) .dotgrid {
		background-image: url('data:image/svg+xml;utf8,<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255,255,255, 0.12)" d="M.5.5h1v1h-1z" fill-rule="evenodd"/></svg>');
	}

	.overline {
		@include typography(overline);
		color: rgba(0, 0, 0, 0.76);
	}

	:global(.dark) .overline {
		color: rgba(255, 255, 255, 0.76);
	}

	footer {
		@include typography(caption);
		position: absolute;
		bottom: 1rem;
		left: 0;
		right: 0;
	}

	h1 {
		@include typography(headline3, 48);
		letter-spacing: -0.07rem;
		position: relative;
		z-index: 1;
	}
</style>
