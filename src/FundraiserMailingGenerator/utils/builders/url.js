// @flow
import queryString from 'query-string';
import { groupByCurrency } from './helpers';
import type { Rates } from '../exchange-rates';

export type RecurringDefault =
  | 'default'
  | 'recurring'
  | 'only_recurring'
  | 'one_off';

type UrlBuilderConfig = {
  amount?: number,
  multiplier?: number,
  oneClick?: boolean,
  rates: Rates,
  recurringDefault?: RecurringDefault,
};

type UrlBuilderOptions = {
  config?: UrlBuilderConfig,
  url?: string,
};

export default class UrlBuilder {
  url: string = 'https://actions.sumofus.org/a/donate';
  config: ?UrlBuilderConfig = null;

  static defaultQuery = queryString.stringify(
    {
      donation_band: UrlBuilder.donationBandSnippet(),
    },
    { encode: false }
  );

  static donationBandSnippet(): string {
    return [
      `{% if suggested_ask_via_usd <= 1 %}nondonor`,
      `{% elif suggested_ask_via_usd <= 19 %}lowdonor`,
      `{% elif suggested_ask_via_usd <= 50 %}middonor`,
      `{% elif suggested_ask_via_usd <= 100 %}highdonor`,
      `{% else %}vhighdonor{% endif %}`,
    ].join('');
  }

  constructor(options: UrlBuilderOptions = {}) {
    if (options.url) this.url = options.url;
    if (options.config) this.config = options.config;
  }

  amount = (currency?: string): string => {
    if (!currency || !this.config || !this.config.rates[currency]) return '';
    const rate = this.config.rates[currency] * (this.config.multiplier || 1);
    const ask = this.config.amount || 'suggested_ask_via_usd';
    return `{{${ask}|multiply:${rate}|floatformat:0}}&currency=${currency}`;
  };

  get query() {
    if (!this.config) return UrlBuilder.defaultQuery;
    let { recurringDefault, oneClick } = this.config;
    const query = {
      amount: groupByCurrency(this.amount),
      recurring_default: recurringDefault,
      one_click: oneClick || undefined,
    };

    return queryString.stringify(query, { encode: false });
  }

  build = () => `${this.url}?${this.query}`;
}
