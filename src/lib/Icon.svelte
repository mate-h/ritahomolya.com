<script lang="ts">
	export const icon = (name) => {
		const lookup = {
			'person.crop.circle.fill': [56256, 56942],
			'checkmark.circle.fill': [56256, 56419],
			'chevron.left': [56256, 56713],
			'chevron.right': [56256, 56714],
			heart: [56256, 57012],
			'heart.fill': [56256, 57013],
			star: [56256, 57026],
			'star.fill': [56256, 57027],
			'star.lefthalf.fill': [56256, 57028],
			plus: [56256, 56700],
			minus: [56256, 56701],
			'trash.fill': [56256, 56850],
			circle: [56256, 56320],
			'xmark.circle.fill': [56256, 56417],
			'circle.lefthalf.fill': [56256, 56322],
			'circle.righthalf.fill': [56256, 56323],
			doc: [56256, 56887]
		};
		return lookup[name].map((n) => String.fromCharCode(n)).join('');
	};

	export let name;
	let className = '';
	export { className as class };
	export let style = '';
</script>

<i {style} class={className}>{icon(name)}</i>

<style>
	i {
		font-family: 'SF Symbols';
		/* font-size: 24px; */
		font-style: normal;
	}
</style>
