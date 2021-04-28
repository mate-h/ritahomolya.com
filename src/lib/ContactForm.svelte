<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { t } from '$lib/message';
	import { language, sentMessage } from '$lib/stores';
	import Input from './Input.svelte';
	let loading = false;
	let addressLink, phoneLink;
	addressLink = `mailto:process.env.RECIPIENT_ADDRESS`;
	phoneLink = `tel:process.env.RECIPIENT_PHONE`;
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
		<Input
			required
			disabled={$sentMessage !== null}
			class="h-6"
			placeholder={t('index.name', $language)}
			name="name"
			autocomplete="name"
		/>
		<Input
			required
			class="mt-2"
			id="email"
			disabled={$sentMessage !== null}
			placeholder={t('index.email', $language)}
			name="email"
			type="email"
			autocomplete="email"
		/>
		<Input
			required
			class="mt-2"
			component="textarea"
			disabled={$sentMessage !== null}
			name="message"
			placeholder={t('index.message', $language)}
		/>
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
			disabled={$sentMessage !== null}
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
</style>
