// @flow
import qs from 'querystringify';
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
  correctLowAsks?: boolean,
};

type UrlBuilderOptions = {
  config?: UrlBuilderConfig,
  url?: string,
};

export default class UrlBuilder {
  url: string = 'https://actions.sumofus.org/a/donate';
  config: ?UrlBuilderConfig = null;

  static defaultQuery = qs
    .stringify({ donation_band: 'DONATION_BANDS', source: 'fwd' })
    .replace('DONATION_BANDS', UrlBuilder.donationBandSnippet());

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
    if (this.config.amount) {
      return `{{${
        this.config.amount
      }|multiply:${rate}|floatformat:0}}&currency=${currency}`;
    }
    let ask = `{{suggested_ask_via_usd|multiply:${rate}|floatformat:0}}`;
    if (this.config.correctLowAsks) {
      ask = `{% if suggested_ask_via_usd >= 2.5 %}${ask}{% else %}{{3|multiply:${rate}|floatformat:0}}{% endif %}`;
    }
    return `${ask}&currency=${currency}`;
  };

  get query() {
    if (!this.config) return UrlBuilder.defaultQuery;
    let { recurringDefault, oneClick } = this.config;
    const query = {
      amount: 'AMOUNT',
      recurring_default: recurringDefault,
      one_click: oneClick || undefined,
      source: 'fwd',
    };

    return qs.stringify(query).replace('AMOUNT', groupByCurrency(this.amount));
  }

  build = () => `${this.url}?${this.query}`;
}
