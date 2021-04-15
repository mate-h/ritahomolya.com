<script lang="ts">
	import Masonry from './Masonry.svelte';

	// TODO fetch from firestore
	type Project = {
		images: string[];
		videos?: string[];
		title: string;
		description?: string;
	};
	const projects: {
		[key: string]: Project;
	} = {
		bari: {
			images: ['bari-1.png'],
			title: 'Hairdresser logo'
		},
		'books-teens': {
			images: ['book-teens-1.jpeg', 'book-teens-2.jpeg'],
			title: 'Book cover design'
		},
		cctv: {
			images: ['cctv-1.png', 'cctv-2.png'],
			title: 'CCTV-time lapse logo',
			description:
				'I did this project for a start-up company, that was developing a system for construction sites. They installed CCTV cameras on the construction ground and did a time lapse of the entire construction from start to finish.'
		},
		'ef-studio': {
			images: ['ef-studio-1.png'],
			title: 'EF studio',
			description: 'Logo for video company'
		},
		'fruit-pattern': {
			images: ['fruit-pattern-1.png'],
			title: 'Fruit pattern design',
			description: 'I made this pattern design for a company that sells breakfast cereals'
		},
		koncz: {
			images: ['koncz-1.png'],
			title: 'Photographer logo',
			description: 'This logo is for a freelance photographer named Koncz'
		},
		landscape: {
			images: ['landscape-1.png'],
			title: 'Nighttime Landscape',
			description: `For Easter 2020 I was assigned to make a design based on the fact that we can't celebrate Jesus's resurrection the same way as we used to. At this time, when a hug becomes a weapon and staying away from your family is an act of love, it's important to see that little thing we can still be thankful for. I hope this design makes you wonder a little, about these things!`
		},
		lumiere: {
			images: ['lumiere-1.png', 'lumiere-2.png'],
			title: 'Lumière',
			description: 'Lumière - French for "Light"'
		},
		scout: {
			images: ['scout-1.jpeg', 'scout-2.jpeg', 'scout-3.jpeg'],
			title: 'Hungarian Scout clothing design',
			description:
				'My job in this project was to create a design for a T-shirt and a scouts-tie for Hungarian scouts, who will attend international events. My reference for pattern on the scouts-tie was traditional Hungarian sewing pattern. All the elements of the T-shirt design are either a scout or a Hungarian symbol.'
		},
		'history-animation': {
			images: [],
			videos: ['history-animation.mp4'],
			title: 'Néri History Animation'
		},
		'mtv-intro': {
			images: [],
			videos: ['mtv-intro.mp4'],
			title: 'Néri MTV Intro Animation'
		}
	};
</script>

<Masonry class="my-12 mx-4 md:mx-6">
	{#each Object.entries(projects) as [id, project]}
		{#each project.images as image}
			<img alt={project.title} src={`/projects/${image}`} />
		{/each}
		{#if project.videos}
			{#each project.videos as video}
				<video loop autoplay muted src={`/projects/${video}`} />
			{/each}
		{/if}
	{/each}
</Masonry>
