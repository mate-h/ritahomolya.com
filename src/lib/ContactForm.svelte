<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { t } from '$lib/message';
	import { language } from '$lib/stores';
	function handleInput(t: Event) {
		const el: any = t.target;
		el.parentNode.dataset.replicatedValue = this.value;
	}
</script>

<div class="root mt-6">
	<div class="grow-wrap">
		<textarea on:input={handleInput} placeholder={t('index.message', $language)} />
	</div>
</div>

<div class="flex justify-center mt-6">
	<Button class="mx-2">
		<Icon name="envelope" />
		{t('index.contact', $language)}
	</Button>
	<Button class="mx-2">
		<Icon name="phone.fill" />
		{t('index.phone', $language)}
	</Button>
</div>

<style lang="scss">
	@import '../lib/mixins';
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
			@apply mx-auto;
			padding: 7px;
			border-radius: 2px;
			width: 272px;
			grid-area: 1 / 1 / 2 / 2;
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
