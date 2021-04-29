<script lang="ts">
	import { browser } from '$app/env';
	import Button from './Button.svelte';
	import Menu from './Menu.svelte';
	import Pin from './Pin.svelte';
	import { menuOpen } from '$lib/stores';

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
	let adminRoute;
	$: {
		adminRoute = page.path.includes('/admin');
		if (browser) {
			document.getElementById('svelte').style.paddingTop = pinned ? '1.5rem' : '0';
		}
	}
	function pinHandler(e: CustomEvent) {
		pinned = e.detail as boolean;
		document.getElementById('svelte').style.paddingTop = pinned ? '1.5rem' : '0';
	}
	function menuHandler(e: CustomEvent) {
		menuOpen.set(e.detail as boolean);
	}
</script>

{#if session && session.user}
	<div class:fixed={pinned} class="root whitespace-nowrap">
		{#if adminRoute}
			<Menu on:change={menuHandler} top={-0.4375} />
		{/if}
		<Pin {pinned} on:change={pinHandler} top={-0.4375} left={2} />
		<div class="inner mx-4 md:mx-6">
			<span style="padding-left: 2rem" class="body2 truncate">
				{session.user.email}{' • '}
				{#if adminRoute}
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
			background-color: var(--surface);
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
