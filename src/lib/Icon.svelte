<script lang="ts">
	import lookup from './sf-symbol-table';

	export let name: keyof typeof lookup;
	let className = '';
	export { className as class };
	export let style = '';
</script>

<i {style} class={className} {...$$restProps} on:click>{lookup[name]}</i>

<style>
	i {
		font-family: 'SF Symbols';
		/* font-size: 24px; */
		font-style: normal;
	}
</style>
