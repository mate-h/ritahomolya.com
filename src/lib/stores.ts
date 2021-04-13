import { writable } from 'svelte/store';
import type { supported } from './message';
export const language = writable<supported>("en");