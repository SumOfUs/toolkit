//@flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { IntlProvider, FormattedNumber } from 'react-intl';
import queryString from 'query-string';
import Currency from '../../components/Currency';
import { linkStyle } from './styles';

import type { Rates } from './exchange-rates';

export type BuildLinkOptions = {
  amount: number,
  linkText: string,
  url: string,
  currency: string,
  rates: Rates,
  recurringDefault?: string,
  locale?: string,
};

export function buildLink(options: BuildLinkOptions): string {
  if (!options.rates[options.currency]) {
    throw new Error(`Exchange rate for ${options.currency} not found`);
  }
  let convertedAmount = options.rates[options.currency] * options.amount;
  convertedAmount = Math.round(convertedAmount);
  const query = queryString.stringify({
    recurring_default: options.recurringDefault,
    currency: options.currency,
    amount: convertedAmount,
    source: 'fwd',
  });
  const url = `${options.url}?${query}`;
  const [head, tail] = options.linkText.split('{{amount}}');

  return renderToStaticMarkup(
    <a style={linkStyle} title="SumOfUs" href={url}>
      {head}
      <Currency
        locale={options.locale}
        currency={options.currency}
        amount={convertedAmount}
      />
      {tail}
    </a>
  );
}
