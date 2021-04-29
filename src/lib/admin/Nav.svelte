<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import Theme from '$lib/Theme.svelte';
	import Button from './Button.svelte';
	import { menuOpen } from '$lib/stores';
</script>

{#if $menuOpen}
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
			<Button class="mt-2">
				<Icon slot="before" name="plus" />
				Add module
			</Button>
		</ul>
	</nav>
	<div class="spacer" />
{/if}

<style lang="scss">
	@import '../mixins.scss';
	nav {
		position: fixed;
		z-index: 20;
		top: 0;
		padding-top: 1.75rem;
		bottom: 0;
		background-color: white;
		width: 168px;
		// transform: translateY(-0.75rem);
	}
	.spacer {
		width: 168px;
	}
	:global(.dark) nav {
		background-color: var(--surface);
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
