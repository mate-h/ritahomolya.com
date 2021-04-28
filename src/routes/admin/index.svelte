<script lang="ts" context="module">
	export async function load({ page, fetch, session, context }) {
		return {
			props: {
				session,
				context
			}
		};
	}
</script>

<script lang="ts">
	import Input from '$lib/Input.svelte';

	let error = '';
	export let context;
	export let session;
	function submit(e: Event) {
		e.preventDefault();
		error = '';
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		const body = {
			email: data.get('email'),
			password: data.get('password')
		};
		fetch('/api/login', {
			method: 'post',
			body: JSON.stringify(body)
		})
			.then((r) => {
				if (r.status !== 200) {
					error = 'Unauthorized';
				}
				return r.json();
			})
			.then((r) => {
				const session = r.session;
				// localStorage.setItem('token', token);
				document.cookie = `session=${session}`;
				window.location.href = '/admin/dashboard';
			});
	}
</script>

<h1 class="text-center">Admin dashboard</h1>
<p class="text-center">Manage data, content, templates, functions</p>
{#if error !== ''}
	<div class="error text-red-500 dark:text-red-300">{error}</div>
{/if}
<form class="mt-8 mx-auto" on:submit={submit}>
	<Input type="email" placeholder="Email" name="email" />
	<Input class="mt-2" type="password" placeholder="Password" name="password" />
	<button class="block px-4 h-6 mt-4 ml-auto" type="submit">
		<span>Sign in</span>
	</button>
</form>

<style lang="scss">
	@import '../../lib/mixins.scss';
	h1 {
		@include typography(headline5);
	}
	.error {
		@apply mt-2;
		@include typography(caption);
	}
	p {
		@apply mt-2;
		@include typography(caption);
		color: rgba(0, 0, 0, 0.54);
	}
	:global(.dark) p {
		color: rgba(255, 255, 255, 0.54);
	}
	button {
		border-radius: 3px;
		overflow: hidden;
	}
	form {
		max-width: 320px;
		@include typography(body2);
		&::before {
			content: none;
		}
		&::after {
			content: none;
		}
	}
</style>
