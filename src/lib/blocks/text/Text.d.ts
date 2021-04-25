import * as svelte from 'svelte';
import { SvelteComponentTyped } from "svelte";

// one of: h1, h2, h3, h4, h5, h6, span, div, label, i, b, u
export interface TextBlock extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["label"]>  {
  node: string;
  /**
   * @default body2
   */
  typography?: Typography;
  lineHeight?: number;
  class?: string[];
	/**
   * @default false
   */
	editing?: boolean;
}

export type Typography =
	| 'headline1'
	| 'headline2'
	| 'headline3'
	| 'headline4'
	| 'headline5'
	| 'headline6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'button'
	| 'caption'
	| 'overline';
export const defaultTypography: Typography = 'body2';

export default class Text extends SvelteComponentTyped<
  TextBlock
> {}