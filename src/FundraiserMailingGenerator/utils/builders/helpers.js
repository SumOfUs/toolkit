// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Currency from '../../components/Currency';
import { currencyMap } from '../currencyMap';
import type { Rates } from '../exchange-rates';

export function groupByCurrency(fn: (currency: string) => string) {
  return Object.keys(currencyMap)
    .map((currency, i) => {
      const countries = currencyMap[currency];
      const ifelif = i === 0 ? 'if' : 'elif';
      const checks = countries.map(c => `user.country == '${c}'`).join(' or ');
      return `{% ${ifelif} ${checks} %}${fn(currency)}`;
    })
    .concat([`{% else %}${fn('USD')}{% endif %}`])
    .join('');
}

export const suggestedAsk = (
  rates: Rates,
  multiplier: number = 1,
  locale: string
) =>
  groupByCurrency(currency => {
    const rate = rates[currency] * multiplier;
    if (!rate) return '';
    let ask = `{% if suggested_ask_via_usd >= 2.5 %}{{suggested_ask_via_usd|multiply:${rate}|floatformat:0}}`;
    ask += `{% else %}{{3|multiply:${rate}|floatformat:0}}{% endif %}`;
    return renderToStaticMarkup(
      <Currency amount={0} currency={currency} locale={locale} />
    ).replace('0', ask);
  });

export const fixedAsk = (
  amount: number,
  rates: Rates,
  multiplier: number = 1,
  locale: string
) => {
  return groupByCurrency(currency => {
    const rate = rates[currency] * multiplier;
    if (!rate) return '';
    const convertedAmount = amount ? Math.round(amount * rate) : 0;
    return renderToStaticMarkup(
      <Currency amount={convertedAmount} currency={currency} locale={locale} />
    );
  });
};
