//@flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import queryString from 'query-string';
import Currency from '../components/Currency';
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

export function buildPlainText() {}
/*
<p>Will you chip in {% if suggested_ask_via_usd >= 51 %}{% else %}{% if user.country == "Australia" %}AU${{ suggested_ask_via_usd |multiply:"1.31" |floatformat:"0" }} {% elif user.country == "New Zealand" %}NZ${{ suggested_ask_via_usd |multiply:"1.42" |floatformat:"0" }} {% elif user.country == "Canada" %}CA${{ suggested_ask_via_usd |multiply:"1.29" |floatformat:"0" }} {% elif user.country == "Germany" or user.country == "France" or user.country == "Spain" or user.country == "Sweden" or user.country == "Norway" or user.country == "Denmark" or user.country == "Italy" or user.country == "Belgium" %}{{ suggested_ask_via_usd |multiply:"0.85" |floatformat:"0"}} &euro; {% elif user.country == "Ireland" or user.country == "Austria" or user.country == "Netherlands" %}&euro;{{ suggested_ask_via_usd |multiply:"0.85" |floatformat:"0"}} {% elif user.country == "United Kingdom" %}&pound;{{ suggested_ask_via_usd |multiply:"0.75" |floatformat:"0"}} {% elif user.country == "Switzerland" %}CHF{{ suggested_ask_via_usd |multiply:"0.99" |floatformat:"0" }} {% else %}${{ suggested_ask_via_usd }} {% endif %}{% endif %} to help us get toward a plastic free Australia?</p>
*/
