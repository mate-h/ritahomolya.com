const messages = {
  en: {
    'index.overline': 'Graphic Design • Motion Graphic Design',
    'index.footer': 'Made with ❤️ in Canada',
    'lang.en': 'English',
    'lang.hu': 'Hungarian',
    'index.contact': 'Contact'
  },
  hu: {
    'index.overline': 'Grafikai Tervezés • Animáció Készítés',
    'index.footer': '❤️ Szeretettel készült Kanadában',
    'lang.en': 'Angol',
    'lang.hu': 'Magyar',
    'index.contact': 'Kapcsolat'
  }
}

export type supported = keyof typeof messages;
export type messageKey = keyof typeof messages.en;

export function t(key: messageKey, tag: supported): string {
  return messages[tag][key];
}