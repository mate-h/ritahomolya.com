<button {...$$restProps}>
	<slot name="before" />
	<span>
		<slot />
	</span>
	<slot name="after" />
</button>

<style lang="scss">
	@import '../../lib/mixins.scss';
	button {
		position: relative;
		@include active(light);
		@include typography(subtitle2, 18, false);
		border-radius: 3px;
		@apply px-2;
		@apply h-6;
		&:focus {
			outline: none;
			@apply ring-1;
			--tw-ring-color: #007aff;
		}
		& span {
			@include typography(subtitle2, 18);
		}
		&::before {
			border-radius: inherit;
			overflow: none;
		}
	}
	:global(.dark) button {
		@include active(dark);
	}
</style>
