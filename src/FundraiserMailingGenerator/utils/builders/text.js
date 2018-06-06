// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Currency from '../../components/Currency';
import { groupByCurrency } from '../templateSnippets';
import type { Rates } from '../exchange-rates';

type TextBuilderConfig = {
  template: string,
  locale: string,
  rates: Rates,
  // if no amount is passed, it will used `suggested_ask_via_usd`
  amount?: number,
};

export default class TextBuilder {
  config: TextBuilderConfig;
  head: string;
  tail: string;

  constructor(config: TextBuilderConfig) {
    this.config = config;
  }

  get head() {
    if (!this.config) return '';
    const [head] = this.config.template.split('{{amount}}');
    return head;
  }

  get tail() {
    if (!this.config) return '';
    const [, tail] = this.config.template.split('{{amount}}');
    return tail;
  }

  suggestedAsk(): string {
    return groupByCurrency(currency => {
      const rate = this.config.rates[currency];
      if (!rate) return '';
      const ask = `{{suggested_ask_via_usd|multiply:${rate}|floatformat:0}}`;
      return renderToStaticMarkup(
        <Currency amount={0} currency={currency} locale={this.config.locale} />
      ).replace('0', ask);
    });
  }

  get amount(): string {
    const { amount, rates, locale } = this.config;
    return groupByCurrency(currency => {
      const rate = rates[currency];
      if (!rate) return '';
      const convertedAmount = amount ? Math.round(amount * rate) : 0;
      return renderToStaticMarkup(
        <Currency
          amount={convertedAmount}
          currency={currency}
          locale={locale}
        />
      );
    });
  }

  build = () => {
    if (!this.config.template.match(/{{amount}}/)) return this.config.template;
    if (!this.config.amount) {
      return `${this.head}${this.suggestedAsk()}${this.tail}`;
    }
    return `${this.head}${this.amount}${this.tail}`;
  };
}
