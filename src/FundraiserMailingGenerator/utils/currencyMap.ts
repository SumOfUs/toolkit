export type CurrencyMap = {
  [currency: string]: string[];
};

export const currencyMap: CurrencyMap = {
  AUD: ['Australia'],
  CAD: ['Canada'],
  GBP: ['United Kingdom'],
  NZD: ['New Zealand'],
  CHF: ['Switzerland'],
  MXN: ['Mexico'],
  ARS: ['Argentina'],
  BRL: ['Brazil'],
  EUR: [
    'Austria',
    'Belgium',
    'Cyprus',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'Norway',
    'Portugal',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
  ],
};

export default currencyMap;
