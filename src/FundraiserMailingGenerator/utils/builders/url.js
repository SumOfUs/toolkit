// @flow
import queryString from 'query-string';
import { donationBandSnippet, groupByCurrency } from '../templateSnippets';
import type { Rates } from '../exchange-rates';

export type RecurringDefault =
  | 'default'
  | 'recurring'
  | 'only_recurring'
  | 'one_off';

type UrlBuilderConfig = {
  amount: number,
  rates: Rates,
  recurringDefault?: RecurringDefault,
};

type UrlBuilderOptions = {
  url?: string,
  config?: UrlBuilderConfig,
};

export default class UrlBuilder {
  url: string = 'https://actions.sumofus.org/a/donate';
  config: ?UrlBuilderConfig = null;

  static defaultQuery = queryString.stringify(
    {
      donation_band: donationBandSnippet(),
    },
    { encode: false }
  );

  constructor(options: UrlBuilderOptions = {}) {
    if (options.url) this.url = options.url;
    if (options.config) this.config = options.config;
  }

  amount = (currency?: string): string => {
    if (!currency || !this.config || !this.config.rates[currency]) return '';
    const rate = this.config.rates[currency];
    return [
      `{{${this.config.amount}|multiply:${rate}|floatformat:0}}`,
      `currency=${currency}`,
    ].join('&');
  };

  get query() {
    if (!this.config) return UrlBuilder.defaultQuery;
    let recurringDefault = undefined;
    if (this.config.recurringDefault) {
      recurringDefault = this.config.recurringDefault;
    }
    const query = {
      amount: groupByCurrency(this.amount),
      recurring_default: recurringDefault,
    };

    return queryString.stringify(query, { encode: false });
  }

  build = () => `${this.url}?${this.query}`;
}
