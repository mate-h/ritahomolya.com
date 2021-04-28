<script lang="ts">
	import { browser } from '$app/env';

	import Icon from '$lib/Icon.svelte';
	import Button from './Button.svelte';

	export let session;
	export let page;
	export let pinned = false;
	function clearCookies() {
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
		});
	}

	function signOut(e: Event) {
		e.preventDefault();
		clearCookies();
		session = undefined;
		if (window.location.href.includes('/admin')) {
			window.location.reload();
		}
	}
	$: {
		if (browser) {
			document.getElementById('svelte').style.paddingTop = pinned ? '1.5rem' : '0';
		}
	}
	function pinHandler(e: Event) {
		pinned = !pinned;
		document.getElementById('svelte').style.paddingTop = pinned ? '1.5rem' : '0';
	}
</script>

{#if session && session.user}
	<div class:fixed={pinned} class="root whitespace-nowrap">
		<div class="inner mx-4 md:mx-6">
			<span class="body2 truncate">
				<span on:click={pinHandler} class="active">
					<Icon style="opacity: 0.54" name={pinned ? 'pin.fill' : 'pin.slash.fill'} />
				</span>
				{session.user.email}{' • '}
				{#if page.path.includes('/admin')}
					<a href="/">Home</a>
				{:else}
					<a href="/admin">Admin</a>
				{/if}
			</span>
			<span>
				<form on:submit={signOut}>
					<Button style="transform: translateY(0.375rem)" type="submit">Sign out</Button>
				</form>
			</span>
		</div>
		<hr />
	</div>
{/if}

<style lang="scss">
	@import '../../lib/mixins.scss';
	form {
		float: right;
	}
	.root {
		position: relative;
		top: 0;
		width: 100vw;
		height: 1.5rem;
		z-index: 100;
		.inner {
			height: 1.5rem;
		}
		&::after {
			position: absolute;
			z-index: -2;
			content: '';
			@apply inset-0;
			background-color: white;
		}

		:global(.dark) &::after {
			background-color: #2b2b2b;
		}
	}
	.fixed {
		position: fixed;
	}
	:global(.dark) .root {
		color: white;
	}
	hr {
		padding: 0;
		pointer-events: none;
		position: relative;
		z-index: 1;
	}
	button {
		border-radius: 3px;
		@apply px-2;
		@apply h-6;
		@apply mt-2;
		transform: translateY(-0.125rem);
		& > span {
			@include typography(subtitle2, 18);
		}
	}
	.body2 {
		@include typography(body2);
	}
	.active {
		position: relative;
		cursor: pointer;
		@include active('light');
	}
	:global(.dark) .active {
		@include active('dark');
	}
</style>
