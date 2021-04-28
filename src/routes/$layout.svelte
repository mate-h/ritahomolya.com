<script lang="ts" context="module">
	export async function load({ page, fetch, session, context }) {
		return {
			props: {
				session,
				page,
				context
			}
		};
	}
</script>

<script lang="ts">
	import StatusBar from '$lib/admin/StatusBar.svelte';
	export let session;
	export let page;
	// leave this unused import so document.body gets the .dark class
	import { theme } from '$lib/stores';
	import '../app.scss';
</script>

<StatusBar {session} {page} />
<slot />
