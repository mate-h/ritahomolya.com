const messages = {
  en: {
    'index.overline': 'Graphic Design • Motion Graphic Design',
    'index.footer': 'Made with ❤️ in Canada',
    'lang.en': 'English',
    'lang.hu': 'Hungarian',
    'lang.it': 'Italian',
    'index.contact': 'Contact',
    'index.email': 'Email',
    'index.phone': 'Phone',
    'index.message': 'Message',
    'index.send': 'Send',
    'index.name': 'Name',
    'index.send-message': 'Send a message',
  },
  hu: {
    'index.overline': 'Grafikai Tervezés • Animáció Készítés',
    'index.footer': '❤️ Szeretettel készült Kanadában',
    'lang.en': 'Angol',
    'lang.hu': 'Magyar',
    'lang.it': 'Olasz',
    'index.contact': 'Kapcsolat',
    'index.email': 'E-mail',
    'index.phone': 'Telefon',
    'index.message': 'Üzenet',
    'index.send': 'Küldés',
    'index.name': 'Név',
    'index.send-message': 'Üzenet küldése',
  },
  it: {
    'index.overline': 'Progettazione grafica • Animazioni',
    'index.footer': 'Realizzato con ❤️ in Canada',
    'lang.en': 'Inglese',
    'lang.hu': 'Ungherese',
    'lang.it': 'Italiano',
    'index.contact': 'Contatto',
    'index.email': 'Email',
    'index.phone': 'Telefono',
    'index.message': 'Messaggio',
    'index.send': 'Invia',
    'index.name': 'Nome',
    'index.send-message': 'Invia un messaggio',
  }
}

export type supported = keyof typeof messages;
export const languages = Object.keys(messages) as supported[];
export const defaultLang: supported = "en";
export type messageKey = keyof typeof messages.en;

export function t(key: messageKey, tag: supported): string {
  return messages[tag][key];
}