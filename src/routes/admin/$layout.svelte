<script lang="ts" context="module">
	export async function load({ page, fetch, session, context }) {
		// routing logic
		if (!session.user || !session.user.admin) {
			if (page.path !== '/admin') {
				return {
					status: 302,
					redirect: '/admin'
				};
			}
		} else {
			if (page.path === '/admin') {
				return {
					status: 302,
					redirect: '/admin/dashboard'
				};
			}
		}
		return {
			props: {
				session,
				context
			}
		};
	}
</script>

<script lang="ts">
	import Nav from '$lib/admin/Nav.svelte';
	export let session;
</script>

{#if !session.user}
	<main class="container mx-auto p-6 mt-6 dark:text-white">
		<slot />
	</main>
{:else}
	<div class="flex">
		<Nav />
		<div class="mx-4 md:mx-6 flex-grow">
			<main class="container mx-auto p-6 mt-6 dark:text-white">
				<slot />
			</main>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../../lib/mixins.scss';
	:global(.dark) {
		color: white;
	}
	main {
		background-color: var(--surface);
		border-radius: 3px;
		min-height: calc(100vh - 3rem);
	}
</style>
