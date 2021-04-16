export const generateId = () => Math.random().toString(36).substr(2, 9);

const language = "hu-HU"; //navigator.language

export const dateFormat = (date) =>
  new Intl.DateTimeFormat(language).format(new Date(date));
export const relativeFormat = (d) => {
  try {
    const diff = new Date().getTime() - new Date(d).getTime();
    const days = diff / (1000 * 3600 * 24);
    const rtf = new Intl.RelativeTimeFormat(language);
    if (days > 31) {
      const months = diff / (1000 * 3600 * 24 * 30.42);
      return rtf.format(Math.ceil(-months), "month");
    }
    if (days > 1) {
      return rtf.format(Math.ceil(-days), "day");
    }
    const hours = diff / (1000 * 3600);
    if (hours >= 1) {
      return rtf.format(Math.ceil(-hours), "hour");
    }
    const minutes = diff / (1000 * 60);
    if (minutes >= 1) {
      return rtf.format(Math.ceil(-minutes), "minute");
    }
    return {
      "hu-HU": "most",
    }[language];
  } catch (e) {
    return dateFormat(d);
  }
};

export const formatPercent = (num) => {
  const option = {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  var formatter = new Intl.NumberFormat(language, option);
  return formatter.format(num);
};

export function getRem() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/** Converts rem to CSS pixels */
export function rem2px(rem) {
  return rem * getRem();
}

/** Converts density independent pixels or points to rem */
export function dp2rem(dp) {
  return dp / 16;
}

/** Converts density independent pixels or points to CSS pixels */
export function dp2px(dp) {
  return (dp / 16) * getRem();
}
