// @flow
import qs from 'querystringify';
import { omitBy, isUndefined } from 'lodash';
import { groupByCurrency } from './helpers';
import { Rates } from '../exchange-rates';

export type RecurringDefault = '' | 'recurring' | 'only_recurring' | 'one_off' | 'only_one_off';

export type UrlBuilderConfig = {
  amount?: number;
  omitAmount?: boolean;
  multiplier?: number;
  oneClick?: boolean;
  rates?: Rates;
  recurringDefault?: RecurringDefault;
  correctLowAsks?: boolean;
  weekly?: boolean;
};

type UrlBuilderOptions = {
  config?: UrlBuilderConfig;
  url?: string;
};

export default class UrlBuilder {
  url: string = 'https://actions.sumofus.org/a/donate';
  config: UrlBuilderConfig | null = null;

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
    if (!currency || !this.config?.rates?.[currency]) return '';
    const rate = this.config.rates[currency] * (this.config.multiplier || 1);
    if (this.config.amount) {
      return `{{${this.config.amount}|multiply:${rate}|floatformat:0}}`;
    } else {
      let ask = `{% if suggested_ask_via_usd >= 1 %}{{suggested_ask_via_usd|multiply:${rate}|floatformat:0}}{% else %}1{% endif %}`;
      if (this.config.correctLowAsks) {
        ask = `{% if suggested_ask_via_usd >= 2.5 %}${ask}{% else %}{{3|multiply:${rate}|floatformat:0}}{% endif %}`;
      }
      return ask;
    }
  };

  get query() {
    if (!this.config) return UrlBuilder.defaultQuery;
    let { recurringDefault, omitAmount, oneClick, weekly } = this.config;
    const query = {
      amount: !omitAmount ? 'AMOUNT' : undefined,
      currency: 'CURRENCY',
      recurring_default: recurringDefault,
      weekly: weekly,
      one_click: oneClick || undefined,
      source: 'fwd',
    };
    return qs
      .stringify(omitBy(query, isUndefined))
      .replace('AMOUNT', groupByCurrency(this.amount))
      .replace(
        'CURRENCY',
        groupByCurrency(currency => currency)
      );
  }

  build = () => `${this.url}?${this.query}`;
}
