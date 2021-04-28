<script lang="ts">
	import Masonry from './Masonry.svelte';
	import { t } from '$lib/message';
	import { language } from '$lib/stores';

	// TODO fetch from firestore
	type Project = {
		images: string[];
		videos?: string[];
		title: string;
		date: string;
		description?: string;
	};
	let projects: {
		[key: string]: Project;
	};
	language.subscribe((language) => {
		projects = {
			bari: {
				images: ['bari-1.png'],
				title: t('projects.bari.title', language),
				date: '2020'
			},
			'books-teens': {
				images: ['book-teens-1.jpeg', 'book-teens-2.jpeg'],
				title: t('projects.books-teens.title', language),
				date: '2020'
			},
			cctv: {
				images: ['cctv-1.png', 'cctv-2.png'],
				title: t('projects.cctv.title', language),
				description: t('projects.cctv.description', language),
				date: '2019'
			},
			'ef-studio': {
				images: ['ef-studio-1.png'],
				title: t('projects.ef-studio.title', language),
				description: t('projects.ef-studio.description', language),
				date: '2019'
			},
			'fruit-pattern': {
				images: ['fruit-pattern-1.png'],
				title: t('projects.fruit-pattern.title', language),
				description: t('projects.fruit-pattern.description', language),
				date: '2020'
			},
			koncz: {
				images: ['koncz-1.png'],
				title: t('projects.koncz.title', language),
				description: t('projects.koncz.description', language),
				date: '2020'
			},
			landscape: {
				images: ['landscape-1.png'],
				title: t('projects.landscape.title', language),
				description: t('projects.landscape.description', language),
				date: '2020'
			},
			lumiere: {
				images: ['lumiere-1.png', 'lumiere-2.png'],
				title: t('projects.lumiere.title', language),
				description: t('projects.lumiere.description', language),
				date: '2020'
			},
			scout: {
				images: ['scout-1.jpeg', 'scout-2.jpeg', 'scout-3.jpeg'],
				title: t('projects.scout.title', language),
				description: t('projects.scout.description', language),
				date: '2020'
			},
			'history-animation': {
				images: [],
				videos: ['history-animation.mp4'],
				title: t('projects.history-animation.title', language),
				date: '2021'
			},
			'mtv-intro': {
				images: [],
				videos: ['mtv-intro.mp4'],
				title: t('projects.mtv-intro.title', language),
				date: '2021'
			}
		};
	});
</script>

<section>
	<hr class="mx-6 md:mx-8 pb-8" />

	<h1 class="title text-left mx-6 md:mx-8">{t('index.projects.title', $language)}</h1>
	<h6 class="subtitle text-left mx-6 md:mx-8">{t('index.projects.subtitle', $language)}</h6>
	<Masonry class="mt-4 mb-12 mx-4 md:mx-6">
		{#each Object.entries(projects) as [id, project]}
			{#each project.images as image}
				<div class="detail">
					<img alt={project.title} src={`/projects/${image}`} />
					<div class="overlay">
						<h6 class="overline">{project.date}</h6>
						<h1 class="title">{project.title}</h1>
						{#if project.description}
							<h6 class="subtitle">{project.description}</h6>
						{/if}
					</div>
				</div>
			{/each}
			{#if project.videos}
				{#each project.videos as video}
					<div class="detail">
						<video loop autoplay muted src={`/projects/${video}`} />
						<div class="overlay">
							<h6 class="overline">{project.date}</h6>
							<h1 class="title">{project.title}</h1>
							{#if project.description}
								<h6 class="subtitle">{project.description}</h6>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		{/each}
	</Masonry>
</section>

<style lang="scss">
	@import './mixins';
	.overline {
		@include typography(overline);
	}
	.title {
		@include typography(headline6);
	}
	.subtitle {
		@include typography(caption);
		@apply mt-2;
		text-overflow: ellipsis;
	}
	.detail {
		position: relative;
		text-align: left;
		color: black;
		& > .overlay {
			overflow: hidden;
			padding: 1rem;
			background-color: rgba(255, 255, 255, 0.76);
			opacity: 0;
			top: 0;
			left: 0;
			right: 0;
			min-height: 100%;
			position: absolute;
			z-index: 1;
			transition: opacity 75ms linear;
		}
		&:hover > .overlay {
			opacity: 1;
		}
	}
	:global(.dark) .detail {
		color: white;
		& > .overlay {
			background-color: rgba(0, 0, 0, 0.54);
		}
	}
</style>
