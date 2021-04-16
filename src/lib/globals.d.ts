declare namespace Intl {
  /**
     * [BCP 47 language tag](http://tools.ietf.org/html/rfc5646) definition.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
     *
     * [Wikipedia](https://en.wikipedia.org/wiki/IETF_language_tag).
     */
  type BCP47LanguageTag = string;
  class Locale {
    constructor(tag: BCP47LanguageTag)
    baseName: string;
    calendar: string;
    caseFirst: string;
    collation: string;
    hourCycle: string;
    language: string;
    numberingSystem: string;
    numeric: string;
    region: string;
    script: string;
  }
}