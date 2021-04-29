import { writable } from 'svelte/store';
import { defaultLang, languages } from './message';
import type { supported } from './message';
import { browser } from '$app/env';

/** Returns the language part from the current locale tag */
export function getLanguage(localeTag: Intl.BCP47LanguageTag): supported {
	function parse(t): string {
		try {
			return new Intl.Locale(t).language;
		} catch (e) {
			/*noop*/
		}

		return t.split('-')[0];
	}
	const targetLang = parse(localeTag);
	if (languages.includes(targetLang as supported)) {
		return targetLang as supported;
	}
	return defaultLang;
}

let currentLang = defaultLang;
if (browser) {
	currentLang = getLanguage(navigator.language);
}
export const language = writable<supported>(currentLang);

let sentMessageStored;
if (browser) {
	sentMessageStored = localStorage.getItem('sentMessage');
}
export const sentMessage = writable(sentMessageStored ? JSON.parse(sentMessageStored) : null);
sentMessage.subscribe((value) => {
	if (browser) {
		localStorage.setItem('sentMessage', JSON.stringify(value));
	}
});

type Theme = 'light' | 'dark';
let currentTheme: Theme = 'light';
if (browser) {
	if (localStorage.theme) {
		currentTheme = localStorage.theme;
	} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		currentTheme = 'dark';
	} else {
		currentTheme = 'light';
	}
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.theme !== 'dark' || localStorage.theme !== 'light') {
      if (e.matches) {
        theme.set('dark');
      } else {
        theme.set('light');
      }
    }
  });
}
export const theme = writable<Theme>(currentTheme);
theme.subscribe((t) => {
	if (browser) {
		if (t === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}
});
type Mode = { mode: 'orbit'|'follow', type: 'wireframe'|'solid'};
let mode: Mode = { mode: 'orbit', type: 'solid' };
if (browser) {
  // if device supports cursor
  if (window.matchMedia('(pointer:fine)').matches) {
    mode = { ...mode, mode: 'follow'}
  }
}
export const viewMode = writable<Mode>(mode);

export const menuOpen = writable<boolean>(true);