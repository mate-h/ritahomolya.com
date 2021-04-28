<script lang="ts">
	import JsonView from '$lib/JsonView.svelte';
	//
	const template = {
		path: '/projects',
		type: 'view',
		class: 'page',
		meta: {
			title: '${title} | Projects',
			description: '${description}',
			image: '${thumbnail}'
		},
		content: {
			date: {
				type: 'text',
				typography: 'overline',
				class: 'text-opacity-54',
				content: '${date}'
			},
			title: {
				type: 'text',
				typography: 'headline6',
				content: '${title}'
			}
		},
		arr: [
			{
				name: 'project',
				plural: 'projects'
			},
			{
				name: 'root'
			}
		]
	};
</script>

<h1>Templates</h1>
<JsonView object={template} />

<style lang="scss">
	@import '../../lib/mixins.scss';
	h1 {
		@include typography(headline5);
	}
</style>
