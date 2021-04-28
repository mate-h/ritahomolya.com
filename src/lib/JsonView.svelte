<script lang="ts">
	import Ul from '$lib/html/Ul.svelte';
	import Li from '$lib/html/Li.svelte';
	import Div from '$lib/html/Div.svelte';
	import Icon from './Icon.svelte';
	export let object: Record<string, unknown> | unknown[];
	if (object === null || object === undefined) {
		object = {};
	}
	export let inset = 0;
	export let item = false;
	export let expanded = true;
	export let expandable = true;
	let ptr = 0;
	let sections = Object.entries(object).reduce((acc, [key, val]) => {
		if (typeof val === 'object' || Array.isArray(val)) {
			acc.push({ key, val, iterable: true, expanded });
			ptr++;
		} else {
			if (!acc[ptr]) acc[ptr] = [];
			try {
				acc[ptr].push({ key, val, expanded });
			} catch (e) {
				// console.log(e, acc[ptr]);
			}
		}
		//
		return acc;
	}, []);

	let component = item ? Li : Div;
	let className = 'text-left';
	let style = `margin-left: ${inset}rem`;
	if (Array.isArray(object)) {
		component = Ul;
		className = 'text-left list-disc px-4';
		style = `margin-left: ${inset + 0}rem`;
	}
</script>

<svelte:component this={component} {style} class={className}>
	{#each sections as section}
		{#if section.iterable}
			{#if Array.isArray(object)}
				<svelte:self item object={section.val} inset={inset + 0.5} />
			{:else}
				<p
					on:click={() => {
						if (!expandable) return;
						section.expanded = !section.expanded;
					}}
					class={`${expandable ? 'active' : ''} px-4 h-6`}
				>
					<span class="key">
						{section.key}
					</span>
					{#if expandable}
						<span class="icon float-right">
							<Icon name={section.expanded ? 'chevron.down' : 'chevron.up'} />
						</span>
					{/if}
				</p>
				{#if section.expanded}
					<svelte:self object={section.val} inset={inset + 0.5} />
				{/if}
			{/if}
		{:else}
			<div class={`flex ${item ? '' : 'px-4'}`}>
				<ul>
					{#each section as { key, val }}
						<li>
							<p class="key">{key}</p>
						</li>
					{/each}
				</ul>
				<ul>
					{#each section as { key, val }}
						<li>
							<p class="val">{val}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/each}
</svelte:component>

<style lang="scss">
	@import './mixins.scss';
	.active {
		position: relative;
		cursor: pointer;
		@include active('light');
		transform: translateY(0.5rem);
		z-index: 1;
		overflow: hidden;
		&::before {
			border-radius: 3px;
			overflow: hidden;
		}
		& span {
			display: inline-block;
			transform: translateY(-0.5rem);
		}
	}
	:global(.dark) .active {
		@include active('dark');
	}
	ul {
		margin-right: 0.5rem;
	}
	.key {
		opacity: 0.54;
	}
	.icon {
		@include typography(caption, 24);
		opacity: 0.54;
	}
	.key,
	.val {
		@include typography(body2);
	}
</style>
