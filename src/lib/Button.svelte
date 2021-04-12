<script>
	import rounded from '$lib/rounded';

	let className;
	export { className as class };

	function handler() {}
</script>

<button class={className} on:click={handler}>
	<div class="root" use:rounded={{ radius: 32 }}>
		<div class="edge" use:rounded={{ radius: 28 }} />
		<div class="foreground" />
		<span><slot /></span>
	</div>
</button>

<style lang="scss">
	@import './mixins.scss';

	// hover-dark: 0.08;
	// focus-dark: 0.24;
	// pressed-dark: 0.32;

	button {
		transform: translateY(3px);
		height: 2rem;
		color: white;

		&:focus {
			outline: none;
		}
		&:hover > .root > .edge {
			background-color: rgba(255, 255, 255, 0.08);
		}
		&:focus > .root > .edge {
			background-color: rgba(255, 255, 255, 0.24);
		}
		&:active > .root > .edge {
			background-color: rgba(255, 255, 255, 0.32);
		}
	}

	.root {
		@apply px-2;
		height: 100%;
		position: relative;
		background-color: #007aff;
	}
	.foreground {
		@include fill-parent;
		transition: background-color 75ms linear;
		background-color: rgba(255, 255, 255, 0);
		z-index: 1;
	}
	.edge {
		margin: 2px;
		@include fill-parent;
		background-color: #007aff;
	}
	span {
		@include typography(subtitle2, 21);
		position: relative;
		z-index: 1;
	}
</style>
