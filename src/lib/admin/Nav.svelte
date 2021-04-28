<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import Theme from '$lib/Theme.svelte';
	import Button from './Button.svelte';
</script>

<nav class="px-4 md:px-6 pt-4">
	<Theme />
	<ul>
		<li>
			<a href="/admin/dashboard">Dashboard</a>
		</li>
		<li>
			<a href="/admin/templates">Templates</a>
		</li>
		<p class="subtitle">Modules</p>
		<li>
			<a href="/admin/projects">Projects</a>
		</li>
		<Button>
			<Icon slot="before" name="plus" />
			Add module
		</Button>
	</ul>
</nav>

<style lang="scss">
	@import '../mixins.scss';
	nav {
		background-color: white;
		transform: translateY(-0.75rem);
	}
	:global(.dark) nav {
		background-color: #2b2b2b;
	}
	button {
		border-radius: 3px;
		overflow: hidden;
		@apply px-2;
		@apply mt-2;
	}
	.subtitle {
		@include typography(overline);
		@apply mt-4;
	}
	li {
		@include typography(subtitle2);
	}
	a {
		position: relative;
		z-index: 1;
		color: #007aff;
		text-decoration: underline;
	}
	:global(.dark) a {
		color: #0a84ff;
	}
</style>
