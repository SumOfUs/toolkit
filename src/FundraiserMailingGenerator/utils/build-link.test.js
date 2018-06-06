// @flow
import queryString from 'query-string';
import { buildLink } from './build-link';

import type { BuildLinkOptions } from './build-link';

const options: BuildLinkOptions = {
  amount: 10,
  linkText:
    'Will you chip in {{amount}} to help fight against corporate power?',
  url: 'https://actions.sumofus.org/a/donate',
  currency: 'USD',
  rates: {
    AUD: 1.3,
    CAD: 1.29,
    CHF: 0.99,
    EUR: 0.85,
    GBP: 0.74,
    NZD: 1.42,
    USD: 1,
  },
  recurringDefault: 'default',
  locale: 'en-US',
};

describe('buildLink', () => {
  describe('Link text', () => {
    test('Substitutes {{amount}} for the converted amount', () => {
      expect(buildLink(options)).toEqual(
        expect.stringContaining(
          'Will you chip in $10 to help fight against corporate power?'
        )
      );

      expect(buildLink({ ...options, currency: 'GBP' })).toEqual(
        expect.stringContaining('chip in £7 to')
      );
    });

    test('Renders the amount in the correct locale', () => {
      expect(buildLink({ ...options, locale: 'en' })).toEqual(
        expect.stringContaining('chip in $10 to')
      );

      expect(buildLink({ ...options, locale: 'fr' })).toEqual(
        expect.stringContaining(
          'Will you chip in 10 $US to help fight against corporate power'
        )
      );

      expect(buildLink({ ...options, locale: 'de' })).toEqual(
        expect.stringContaining(
          'Will you chip in 10 $ to help fight against corporate power?'
        )
      );

      expect(buildLink({ ...options, currency: 'EUR', locale: 'de' })).toEqual(
        expect.stringContaining(
          'Will you chip in 9 € to help fight against corporate power?'
        )
      );
    });

    test('The amount gets rounded to the nearest integer', () => {
      expect(buildLink({ ...options, amount: 8, currency: 'EUR' })).toEqual(
        expect.stringContaining('chip in €7 to')
      );
    });
  });

  describe('Link URL', () => {
    test('URL contains all query parameters', () => {
      const link = buildLink(options);
      const query = queryString
        .stringify({
          recurring_default: options.recurringDefault,
          amount: options.amount,
          currency: options.currency,
        })
        .replace(/&/g, '&amp;');
      const expected = `href="${options.url}?${query}`;
      expect(link).toEqual(expect.stringContaining(expected));
    });
  });

  describe('Link Style', () => {
    test('link to have a style attribute', () => {
      expect(buildLink(options)).toEqual(
        expect.stringMatching(/style="font-size:14px;font-weight:bold.+\"/)
      );
    });
  });
});
