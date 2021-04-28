import * as svelte from 'svelte';
import { SvelteComponentTyped } from "svelte";

export interface ImageBlock extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["img"]> {
  src: string;
  alt: string;
  class?: string;
  caption?: string;
  /**
   * @default false
   */
	editing?: boolean;
}

export default class Image extends SvelteComponentTyped<
  ImageBlock
> {}