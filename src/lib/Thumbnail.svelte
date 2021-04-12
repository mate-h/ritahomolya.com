<div class="root">
	{#each [...new Array(7)] as v, i}
		<div id={`thumbnail-${6 - i}`} style={`--url: url("thumbnail-${6 - i}.png")`} />
	{/each}
</div>

<style lang="scss">
	$perspective: 3;
	:global(#svelte) {
		perspective: #{$perspective}px;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	@for $i from 0 to 6 {
		$scale: 0.5;
		$offset: $scale * (6 - $i);

		// higher i => higher up in Y
		#thumbnail-#{$i} {
			transform: translateZ(-#{$offset}px) scale(#{1 + ($offset / $perspective)}) translateY(-3vh);
		}
	}

	.root {
		position: relative;
		height: 279px;
		width: 279px;
		@apply mx-auto;
		z-index: -1;
	}
	div:not(.root) {
		@apply inset-0;
		position: absolute;
		background-image: var(--url);
		background-size: contain;
	}
</style>
