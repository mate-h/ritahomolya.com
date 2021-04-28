<script lang="ts">
	import Button from './Button.svelte';

	export let session;
	export let page;
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
</script>

{#if session && session.user}
	<div class="root whitespace-nowrap">
		<div class="inner mx-4 md:mx-6">
			<span class="body2 truncate"
				>{session.user.email}{' • '}
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
	</div>
	<hr />
{/if}

<style lang="scss">
	@import '../../lib/mixins.scss';
	form {
		float: right;
	}
	.root {
		position: relative;
		z-index: 1;
		&::after {
			position: absolute;
			z-index: -2;
			content: '';
			left: 0;
			right: 0;
			top: 0;
			bottom: 0.75rem;
			background-color: white;
		}

		:global(.dark) &::after {
			background-color: #2b2b2b;
		}
	}
	:global(.dark) .root {
		color: white;
	}
	hr {
		padding: 0;
		transform: translateY(-0.75rem);
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
</style>
