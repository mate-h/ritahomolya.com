<script lang="ts">
	import rounded from '$lib/rounded';
	import { language } from './stores';
	import type { supported, messageKey } from './message';
	import { t } from './message';

	function handler(lang: supported) {
		language.update(() => lang);
	}
	const items: {
		icon: string;
		key: messageKey;
		lang: supported;
	}[] = [
		{
			icon: '🇬🇧',
			key: 'lang.en',
			lang: 'en'
		},
		{
			icon: '🇭🇺',
			key: 'lang.hu',
			lang: 'hu'
		},
		{
			icon: '🇮🇹',
			key: 'lang.it',
			lang: 'it'
		}
	];
</script>

<ul>
	{#each items as { icon, key, lang }, i}
		<li>
			<button
				use:rounded
				class:selected={$language === lang}
				on:click={() => handler(lang)}
				title={t(key, $language)}
			>
				<span>{icon}</span>
			</button>
		</li>
	{/each}
</ul>

<style lang="scss">
	@import './mixins.scss';
	ul {
		display: flex;
		justify-content: center;
	}
	span {
		position: relative;
		z-index: 1;
	}
	button {
		transition: background-color 75ms linear;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 2rem;
		height: 2rem;
		font-size: 1.5rem;
		cursor: pointer;
		@apply mx-2;
		@include active('light');

		&:focus {
			outline: none;
		}
	}
</style>
