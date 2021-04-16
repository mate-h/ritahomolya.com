<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { t } from '$lib/message';
	import { language, sentMessage } from '$lib/stores';
	let message = '';
	let loading = false;
	let addressLink, phoneLink;
	addressLink = `mailto:process.env.RECIPIENT_ADDRESS`;
	phoneLink = `tel:process.env.RECIPIENT_PHONE`;
	function handleInput(t: Event) {
		const el: any = t.target;
		el.parentNode.dataset.replicatedValue = this.value;
		message = this.value;
	}
	function handleSubmit(t: Event) {
		t.preventDefault();
		if ($sentMessage == null) {
			const form = t.target as HTMLFormElement;
			const data = new FormData(form);
			let object = {};
			data.forEach((value, key) => (object[key] = value));
			loading = true;
			fetch('/api/message', {
				method: 'post',
				body: JSON.stringify(object)
			})
				.then((r) => r.json())
				.then((r) => {
					loading = false;
					sentMessage.update(() => object);
					form.reset();
				});
		}
	}
	function handleEmail() {
		window.open(addressLink, '_blank').focus();
	}
	function handlePhone() {
		window.open(phoneLink, '_blank').focus();
	}
</script>

<p class="mx-auto mt-2 mb-1 text-left">
	<span class="subtitle">{t('index.send-message', $language)}</span>
</p>
<form class="mx-auto" on:submit={handleSubmit}>
	<div class="root">
		<div class="h-6">
			<input
				disabled={$sentMessage !== null}
				class="h-6"
				placeholder={t('index.name', $language)}
				name="name"
				autocomplete="name"
			/>
		</div>
		<div class="h-6 mt-2">
			<input
				disabled={$sentMessage !== null}
				class="h-6"
				placeholder={t('index.email', $language)}
				name="email"
				autocomplete="email"
			/>
		</div>

		<div class="grow-wrap mt-2">
			<textarea
				disabled={$sentMessage !== null}
				name="message"
				on:input={handleInput}
				placeholder={t('index.message', $language)}
			/>
		</div>
	</div>
	<div class="flex justify-end mt-2">
		<Button on:click={handleEmail} title={addressLink}>
			<Icon name="envelope" />
			{t('index.email', $language)}
		</Button>
		<Button on:click={handlePhone} title={phoneLink} class="ml-2 mr-auto">
			<Icon name="phone.fill" />
			{t('index.phone', $language)}
		</Button>
		<Button
			{loading}
			class="relative"
			disabled={message === '' || $sentMessage !== null}
			title={t('index.send', $language)}
			type="submit"
		>
			{#if $sentMessage !== null}
				<Icon name="checkmark" />
				{t('index.sent', $language)}
			{:else}
				<Icon name="paperplane" />
				{t('index.send', $language)}
			{/if}
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
