// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Currency from '../../components/Currency';
import { groupByCurrency, suggestedAsk, fixedAsk } from './helpers';
import { Rates } from '../exchange-rates';

export type TextBuilderConfig = {
  template: string;
  locale: string;
  rates: Rates;
  // if no amount is passed, it will used `suggested_ask_via_usd`
  amount?: number;
  multiplier?: number;
  correctLowAsks?: boolean;
};

export default class TextBuilder {
  config: TextBuilderConfig;

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

  get amount(): string {
    const { amount, rates, locale } = this.config;
    return groupByCurrency(currency => {
      const rate = rates[currency] * (this.config.multiplier || 1);
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
    const {
      amount,
      rates,
      multiplier,
      template,
      locale,
      correctLowAsks,
    } = this.config;
    if (!template.match(/{{amount}}/)) return template;
    const ask = amount
      ? fixedAsk(amount, rates, multiplier, locale)
      : suggestedAsk(rates, multiplier, locale, correctLowAsks);
    return `${this.head}${ask}${this.tail}`;
  };
}
