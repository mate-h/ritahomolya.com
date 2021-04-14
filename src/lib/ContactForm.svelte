<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { t } from '$lib/message';
	import { language } from '$lib/stores';
	let message = '';
	function handleInput(t: Event) {
		const el: any = t.target;
		el.parentNode.dataset.replicatedValue = this.value;
		message = this.value;
	}
	function handleSubmit(t: Event) {
		t.preventDefault();
		const data = new FormData(t.target as HTMLFormElement);
		let object = {};
		data.forEach((value, key) => (object[key] = value));
		fetch('/api/message', {
			method: 'post',
			body: JSON.stringify(object)
		});
	}
</script>

<p class="mx-auto mt-2 mb-1 text-left">
	<span class="subtitle">{t('index.send-message', $language)}</span>
</p>
<form class="mx-auto" on:submit={handleSubmit}>
	<div class="root">
		<div class="h-6">
			<input class="h-6" placeholder={t('index.name', $language)} name="name" autocomplete="name" />
		</div>
		<div class="h-6 mt-2">
			<input
				class="h-6"
				placeholder={t('index.email', $language)}
				name="email"
				autocomplete="email"
			/>
		</div>

		<div class="grow-wrap mt-2">
			<textarea name="message" on:input={handleInput} placeholder={t('index.message', $language)} />
		</div>
	</div>
	<div class="flex justify-end mt-2">
		<Button>
			<Icon name="envelope" />
			{t('index.email', $language)}
		</Button>
		<Button class="ml-2 mr-auto">
			<Icon name="phone.fill" />
			{t('index.phone', $language)}
		</Button>
		<Button disabled={message === ''} title={t('index.send', $language)} type="submit">
			<Icon name="paperplane" />
			{t('index.send', $language)}
		</Button>
	</div>
</form>

<style lang="scss">
	@import '../lib/mixins';
	.subtitle {
		@include typography(subtitle2, 24);
	}
	form,
	p {
		width: 272px;
	}
	.root {
		min-height: 4rem;
		padding-bottom: 14px;
	}
	.grow-wrap {
		display: grid;
		&::after {
			content: attr(data-replicated-value) ' ';
			white-space: pre-wrap;
			word-wrap: break-word;
			visibility: hidden;
			// overflow: scroll;
		}
		& > textarea {
			resize: none;
			overflow: hidden;
		}
		& > textarea,
		&::after {
			@include typography(body2);
			padding: 7px;
			border-radius: 2px;
			width: 272px;
			grid-area: 1 / 1 / 2 / 2;
		}
	}
	input {
		@include typography(body2);
		line-height: normal;
		width: 100%;
		border-radius: 2px;
		transform: translateY(-2px);
		padding-left: 7px;
		@apply ring-1;
		transition: box-shadow 150ms ease;
		--tw-ring-color: rgb(0, 0, 0, 0.12);
		&:focus {
			outline: none;
			--tw-ring-color: #007aff;
			--tw-ring-offset-width: 3px;
		}
		&:active {
			--tw-ring-color: rgba(0, 0, 0, 0.16);
		}
	}
	textarea {
		@apply ring-1;
		transition: box-shadow 150ms ease;
		--tw-ring-color: rgb(0, 0, 0, 0.12);
		&:focus {
			outline: none;
			--tw-ring-color: #007aff;
			--tw-ring-offset-width: 3px;
		}
		&:active {
			--tw-ring-color: rgba(0, 0, 0, 0.16);
		}
	}
</style>
