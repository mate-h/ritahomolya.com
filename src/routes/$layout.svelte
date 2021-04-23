<script>
	import { onMount } from 'svelte';
	import '../app.scss';

	onMount(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (localStorage.theme !== 'dark' || localStorage.theme !== 'light') {
				if (e.matches) {
					document.body.classList.add('dark');
				} else {
					document.body.classList.remove('dark');
				}
			}
		});
	});
</script>

<slot />
