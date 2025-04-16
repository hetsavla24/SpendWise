export const formatCurrency = (amount: number, currency: string, locale: string = 'en-US') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(amount);
};

export const getLanguageDisplayName = (code: string): string => {
  const languageMap: { [key: string]: string } = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'hi': 'Hindi'
  };
  return languageMap[code] || code;
};

export const getLanguageCode = (displayName: string): string => {
  const codeMap: { [key: string]: string } = {
    'English': 'en',
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Hindi': 'hi'
  };
  return codeMap[displayName] || displayName;
}; 