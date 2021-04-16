import { writable } from 'svelte/store';
import { defaultLang, languages } from './message';
import type { supported } from './message';
import { browser } from '$app/env';

/** Returns the language part from the current locale tag */
export function getLanguage(localeTag: Intl.BCP47LanguageTag): supported {
  function parse(t): string {
    try {
      return new Intl.Locale(t).language;
    } catch (e) { /*noop*/ }
  
    return t.split("-")[0];
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
  sentMessageStored = localStorage.getItem("sentMessage");
}
export const sentMessage = writable(sentMessageStored ? JSON.parse(sentMessageStored) : null);
sentMessage.subscribe(value => {
  if (browser) {
    localStorage.setItem("sentMessage", JSON.stringify(value));
  }
});