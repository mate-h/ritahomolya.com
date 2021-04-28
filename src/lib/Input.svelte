<script lang="ts">
	import { onMount } from 'svelte';
	let className = '';
	export { className as class };
	export let component: 'input' | 'textarea' = 'input';
	export let value;
	let textarea;
	onMount(() => {
		if (textarea) {
			textarea.addEventListener('input', handleInput);
			return () => {
				textarea.removeEventListener('input', handleInput);
			};
		}
	});
	function handleInput(event: Event) {
		const el: any = event.target;
		el.parentNode.dataset.replicatedValue = this.value;
	}
</script>

{#if component === 'input'}
	<div class={`root h-6 ${className}`}>
		<input {...$$restProps} class="h-6" bind:value />
	</div>
{:else if component === 'textarea'}
	<div class={`root grow-wrap ${className}`}>
		<textarea bind:this={textarea} {...$$restProps} bind:value />
	</div>
{/if}

<style lang="scss">
	@import './mixins.scss';
	.root {
		// shift back to baseline inline block input
		vertical-align: -2px;
	}
	input {
		@include typography(body2, null, false);
		line-height: normal;
		width: 100%;
		border-radius: 2px;
		// shift text baseline to grid
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

	input,
	textarea {
		&:-webkit-autofill::first-line {
			font-family: 'Inter';
			@include typography(body2, null, false);
		}
	}

	:global(.dark) {
		// rounded that outline works with -webkit-box-shadow, not supported by current browsers
		// see https://caniuse.com/css-has
		// .root:has(input:-webkit-autofill:focus)::after
		input,
		textarea {
			caret-color: white;
			position: relative;
			background-color: #2b2b2b;
			--tw-ring-color: rgba(255, 255, 255, 0.24);
			--tw-ring-offset-color: #2b2b2b;
			// border: none;
			&:focus {
				outline: none;
				--tw-ring-color: #007aff;
			}
			&:active {
				--tw-ring-color: rgba(255, 255, 255, 0.38);
			}

			&:-webkit-autofill,
			&:-webkit-autofill:hover,
			&:-webkit-autofill:focus,
			&:-webkit-autofill:active {
				-webkit-box-shadow: 0 0 0 30px #2b2b2b inset !important;
				outline-style: solid;
				outline-width: 1px;
				outline-color: rgba(255, 255, 255, 0.24);
				background-clip: padding-box;
				margin-bottom: -0.75rem;
				line-height: 1.5rem;
				font-size: 0.875rem;
				letter-spacing: 0.0178571429em;
				font-weight: 400;
				font-variation-settings: 'wght' 400;
				line-height: normal;
			}
			&:-webkit-autofill:focus {
				outline-color: #007aff;
			}
			&:-webkit-autofill {
				-webkit-text-fill-color: white !important;
			}
		}
	}
</style>
