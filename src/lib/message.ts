const messages = {
  en: {
    'index.overline': 'Graphic Design • Motion Graphic Design',
    'index.footer': 'Made with ❤️ in Canada',
    'lang.en': 'English',
    'lang.hu': 'Hungarian',
    'lang.it': 'Italian',
    'index.contact': 'Contact',
  },
  hu: {
    'index.overline': 'Grafikai Tervezés • Animáció Készítés',
    'index.footer': '❤️ Szeretettel készült Kanadában',
    'lang.en': 'Angol',
    'lang.hu': 'Magyar',
    'lang.it': 'Olasz',
    'index.contact': 'Kapcsolat'
  },
  it: {
    'index.overline': 'Progettazione grafica • Animazioni',
    'index.footer': 'Realizzato con ❤️ in Canada',
    'lang.en': 'Inglese',
    'lang.hu': 'Ungherese',
    'lang.it': 'Italiano',
    'index.contact': 'Contatto'
  }
}

export type supported = keyof typeof messages;
export type messageKey = keyof typeof messages.en;

export function t(key: messageKey, tag: supported): string {
  return messages[tag][key];
}