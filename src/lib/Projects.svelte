<script lang="ts">
	import Masonry from './Masonry.svelte';
	import { t } from '$lib/message';
	import { language } from '$lib/stores';

	// TODO fetch from firestore
	type Project = {
		images: string[];
		videos?: string[];
		title: string;
		description?: string;
	};
	let projects: {
		[key: string]: Project;
	};
	language.subscribe((language) => {
		projects = {
			bari: {
				images: ['bari-1.png'],
				title: t('projects.bari.title', language)
			},
			'books-teens': {
				images: ['book-teens-1.jpeg', 'book-teens-2.jpeg'],
				title: t('projects.books-teens.title', language)
			},
			cctv: {
				images: ['cctv-1.png', 'cctv-2.png'],
				title: t('projects.cctv.title', language),
				description: t('projects.cctv.description', language)
			},
			'ef-studio': {
				images: ['ef-studio-1.png'],
				title: t('projects.ef-studio.title', language),
				description: t('projects.ef-studio.description', language)
			},
			'fruit-pattern': {
				images: ['fruit-pattern-1.png'],
				title: t('projects.fruit-pattern.title', language),
				description: t('projects.fruit-pattern.description', language)
			},
			koncz: {
				images: ['koncz-1.png'],
				title: t('projects.koncz.title', language),
				description: t('projects.koncz.description', language)
			},
			landscape: {
				images: ['landscape-1.png'],
				title: t('projects.landscape.title', language),
				description: t('projects.landscape.description', language)
			},
			lumiere: {
				images: ['lumiere-1.png', 'lumiere-2.png'],
				title: t('projects.lumiere.title', language),
				description: t('projects.lumiere.description', language)
			},
			scout: {
				images: ['scout-1.jpeg', 'scout-2.jpeg', 'scout-3.jpeg'],
				title: t('projects.scout.title', language),
				description: t('projects.scout.description', language)
			},
			'history-animation': {
				images: [],
				videos: ['history-animation.mp4'],
				title: t('projects.history-animation.title', language)
			},
			'mtv-intro': {
				images: [],
				videos: ['mtv-intro.mp4'],
				title: t('projects.mtv-intro.title', language)
			}
		};
	});

	console.log(projects);
</script>

<Masonry class="my-12 mx-4 md:mx-6">
	{#each Object.entries(projects) as [id, project]}
		{#each project.images as image}
			<div class="detail">
				<img alt={project.title} src={`/projects/${image}`} />
				<div class="overlay">
					<p class="title">{project.title}</p>
					{#if project.description}
						<p class="subtitle">{project.description}</p>
					{/if}
				</div>
			</div>
		{/each}
		{#if project.videos}
			{#each project.videos as video}
				<div class="detail">
					<video loop autoplay muted src={`/projects/${video}`} />
					<div class="overlay">
						<p class="title">{project.title}</p>
						{#if project.description}
							<p class="subtitle">{project.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	{/each}
</Masonry>

<style lang="scss">
	@import './mixins';
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
		color: white;
		& > .overlay {
			overflow: hidden;
			padding: 1rem;
			background-color: rgba(0, 0, 0, 0.38);
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
</style>
