// @flow

export type CurrencyMap = {
  [currency: string]: string[],
};

export const currencyMap: CurrencyMap = {
  AUD: ['Australia'],
  CAD: ['Canada'],
  GBP: ['United Kingdom'],
  NZD: ['New Zealand'],
  CHF: ['Switzerland'],
  EUR: [
    'Austria',
    'Belgium',
    'Cyprus',
    'Germany',
    'Estonia',
    'Spain',
    'Finland',
    'France',
    'Greece',
    'Ireland',
    'Italy',
    'Lithuania',
    'Luxembourg',
    'Latvia',
    'Malta',
    'Netherlands',
    'Portugal',
    'Slovenia',
    'Slovakia',
  ],
};

export default currencyMap;
