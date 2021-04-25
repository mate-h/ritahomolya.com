<script lang="ts">
	import {
		Canvas,
		Scene,
		PerspectiveCamera,
		DirectionalLight,
		AmbientLight,
		Mesh as MeshComponent,
		WebGLRenderer,
		GLTFLoader,
		OrbitControls,
		Group
	} from 'svelthree';
	import { Mesh, MeshBasicMaterial, Material, Vector3 } from 'svelthree-three';
	import type { Asset } from './Thumbnail.svelte';
	import { theme, viewMode } from './stores';

	export let asset: Asset;
	const z = 35;
	let loaded = false;
	let modelScene: Group;
	let children: Mesh[];
	let prevName = null;
	let prevTheme = null;
	let prevType = null;
	let pick;
	$: {
		if (prevName !== asset.name) {
			asset.load().then((gltf) => {
				modelScene = gltf.scene;
				// (window as any).Mesh = Mesh;
				// (window as any).scene = modelScene;
				loaded = true;
				children = modelScene.children.filter((c) => c.type === 'Mesh') as Mesh[];
			});
		}
		const currentTheme = $theme;
		const color = currentTheme === 'dark' ? 0xffffff : 0x000000;
		if (prevTheme !== currentTheme || prevType !== $viewMode.type) {
			pick = (m: Material | Material[]) => {
				if ($viewMode.type === 'wireframe') {
					return new MeshBasicMaterial({
						color,
						opacity: 0.38,
						transparent: true,
						wireframe: true
					});
				}
				return m;
			};
		}
		prevTheme = currentTheme;
		prevName = asset.name;
		prevType = $viewMode.type;
	}

	export let w: number;
	export let h: number;
	export let style: string;

	// let followMode = false;
	// $: {
	// 	followMode = $viewMode.mode === 'follow';
	// }
	// let vec = new Vector3(0, 0, 0);
	// let curr = new Vector3(0, 0, 0);
	// let animating = false;
	// function onPointerMove(e) {
	// 	// if (!followMode) return;
	// 	let obj = e.detail.target;
	// 	let unpr = new Vector3().copy(e.detail.unprojected);
	// 	curr = obj.worldToLocal(unpr).add(new Vector3(0, 0, z));
	// 	if (!animating) {
	// 		animate(obj);
	// 		animating = true;
	// 	}
	// }
	// const scale = 0.2;
	// function animate(obj) {
	// 	vec.x += (curr.x - vec.x) * scale;
	// 	vec.y += (curr.y - vec.y) * scale;
	// 	vec.z = z;
	// 	obj.lookAt(vec);

	// 	requestAnimationFrame(() => animate(obj));
	// }
</script>

<Canvas {style} let:sti {w} {h} interactive>
	<Scene {sti} let:scene id="scene1">
		<PerspectiveCamera {scene} id="cam1" pos={[0, 0, z]} lookAt={[0, 0, 0]} />
		<AmbientLight {scene} intensity={1} />
		<DirectionalLight {scene} pos={[0, 0, z]} intensity={0.5} />
		<OrbitControls
			{scene}
			autoRotate
			enableDamping
			props={{
				...asset.props
			}}
		/>

		{#if loaded}
			{#each children as child}
				{#if child.type === 'Mesh'}
					<MeshComponent {scene} geometry={child.geometry} material={pick(child.material)} />
				{/if}
			{/each}
		{/if}
	</Scene>

	<WebGLRenderer {sti} sceneId="scene1" camId="cam1" config={{ antialias: true, alpha: true }} />
</Canvas>

<style>
	:global(canvas:focus) {
		outline: none;
	}
</style>
