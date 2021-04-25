<script lang="ts" context="module">
	import { GLTFLoader } from 'svelthree';
	import type { GLTF } from 'svelthree';
	type Props = { n: string; p: Record<string, unknown> };
	export class Asset {
		name: string;
		props?: Record<string, unknown>;
		static loader = new GLTFLoader();
		constructor({ n, p }: Props) {
			this.name = n;
			this.props = p;
		}
		load() {
			return new Promise<GLTF>((cb) => {
				Asset.loader.load(this.name, cb);
			});
		}
	}
	const a = ({ n, p }: Props) => {
		return new Asset({ n, p });
	};
	const assets = [
		a({
			n: '/assets/book.glb',
			p: { maxDistance: 40, minDistance: 16 }
		}),
		a({
			n: '/assets/gecko.glb',
			p: { maxDistance: 15, minDistance: 8 }
		})
	];
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import rounded from '$lib/rounded';
	import ViewOptions from './ViewOptions.svelte';
	import Carousel from './Carousel.svelte';

	let w, h;
	let rootNode;
	let Canvas;
	let style = '';
	let index = 0;
	let asset = assets[index];
	function setIndex(i) {
		index = i.detail;
		asset = assets[index];
	}
	if (browser) {
		requestAnimationFrame(() => {
			const ddpx = window.devicePixelRatio;
			w = rootNode.clientWidth * ddpx;
			h = rootNode.clientHeight * ddpx;
			style = `
				width: ${rootNode.clientWidth}px; 
				height: ${rootNode.clientHeight}px;
				z-index: 20;
				position: relative;
			`;
			import('./Canvas.svelte').then((module) => {
				Canvas = module.default;
			});
		});
	}

	// let three;
	// onMount(() => {
	// 	debugger;
	// 	import('three').then((three) => {
	// 		console.log(three);
	// 	});
	// });
</script>

<div bind:this={rootNode} class="root" use:rounded={{ radius: 64 }}>
	<svelte:component this={Canvas} {w} {h} {style} {asset} />
	<ViewOptions />
	<Carousel on:change={setIndex} />
</div>

<style lang="scss">
	.root {
		position: relative;
		height: 280px;
		width: 280px;
		@apply mx-auto;
		background-color: rgba(0, 0, 0, 0.06);
	}
	:global(.dark) .root {
		background-color: rgba(255, 255, 255, 0.12);
	}
</style>
