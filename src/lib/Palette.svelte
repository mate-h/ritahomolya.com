<script>
	const shades = {
		orange: '600',
		silver: '500',
		green: '700',
		blue: '800',
		yellow: '300',
		teal: '400'
	};
</script>

<div class="root flex justify-center">
	<div class="text-left">
		{#each Object.keys(shades) as color}
			<code class="block">
				{color}-{shades[color]}
			</code>
		{/each}
	</div>
	<div>
		{#each Object.keys(shades) as color}
			<div class={`flex h-6 items-center ${color}`}>
				{#each [...new Array(9)] as v, i}
					<div class={`swatch ${color}-${i + 1}00`} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@import './functions';
	code {
		height: 1.5rem;
		transform: translateY(-0.5rem);
		color: rgba(0, 0, 0, 0.24);
		&::before {
			display: inline-block;
			height: get-rem(24);
			content: '';
		}
	}
	.swatch {
		width: 1rem;
		height: 1rem;
		content: '';
		border-radius: 0.5rem;
		transition: all 150ms ease-out;
		&:hover {
			transform: scale(1.5);
		}
	}
	$colors: 'yellow', 'teal', 'green', 'blue', 'orange', 'silver';
	$shades: (
		'orange': '600',
		'silver': '500',
		'green': '700',
		'blue': '800',
		'yellow': '300',
		'teal': '400'
	);

	@each $color in $colors {
		$shade: map-get($shades, $color);
		@for $i from 1 to 10 {
			@if ($shade == #{$i * 100}) {
				.#{$color}:not(:hover) > .#{$color}-#{$i * 100} {
					transform: scale(1.5);
				}
			}
			.#{$color}-#{$i * 100} {
				background-color: var(--#{$color}-#{$i * 100});
			}
		}
	}
	.root {
		--orange-100: #fffcf9;
		--orange-200: #fef5eb;
		--orange-300: #fde6cd;
		--orange-400: #face9c;
		--orange-500: #f7ac57;
		--orange-600: #e8810b;
		--orange-700: #b06209;
		--orange-800: #784306;
		--orange-900: #3b2103;

		--silver-100: #fcfdfc;
		--silver-200: #f4f6f4;
		--silver-300: #e7ebe6;
		--silver-400: #d0d8cf;
		--silver-500: #b1bfaf;
		--silver-600: #8ca18a;
		--silver-700: #657b63;
		--silver-800: #455443;
		--silver-900: #222921;

		--green-100: #fbfdfa;
		--green-200: #f0f9ed;
		--green-300: #dbf0d4;
		--green-400: #b8e1a9;
		--green-500: #88cd6f;
		--green-600: #5bae3d;
		--green-700: #45842e;
		--green-800: #2f5a1f;
		--green-900: #172c0f;

		--blue-100: #fafdff;
		--blue-200: #ecf8fe;
		--blue-300: #d2eefd;
		--blue-400: #a5ddfc;
		--blue-500: #67c6f9;
		--blue-600: #0aa3f6;
		--blue-700: #077cbb;
		--blue-800: #055580;
		--blue-900: #022a3f;

		--yellow-100: #fefdf1;
		--yellow-200: #fdf8cf;
		--yellow-300: #f9ed81;
		--yellow-400: #eed70b;
		--yellow-500: #d1bd0a;
		--yellow-600: #ad9d08;
		--yellow-700: #837706;
		--yellow-800: #5a5104;
		--yellow-900: #2c2802;

		--teal-100: #fbfdfd;
		--teal-200: #eff7f6;
		--teal-300: #dbedeb;
		--teal-400: #baddd9;
		--teal-500: #8cc6bf;
		--teal-600: #54aaa0;
		--teal-700: #3f8078;
		--teal-800: #2b5752;
		--teal-900: #152a28;
	}
</style>
