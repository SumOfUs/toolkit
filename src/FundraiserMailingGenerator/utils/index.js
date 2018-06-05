// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mapValues } from 'lodash';
import Currency from '../components/Currency';
import currencyMap from './currency-map';
import type { Rates } from './exchange-rates';

export function groupByCurrency(blockFn: (currency: string) => string) {
  const content = Object.keys(currencyMap)
    .map((currency, index) => {
      const countries = currencyMap[currency];
      let keyword = 'if';
      if (index > 0) keyword = 'elif';

      const conditions = countries
        .map(c => `user.country == "${c}"`)
        .join(' or ');

      return `{% ${keyword} ${conditions} %}${blockFn(currency)}`;
    })
    .concat([`{% else %}${blockFn('USD')}{% endif %}`])
    .join('');

  return `{% if suggested_ask_via_usd >= 51 %}{% else %}${content}{% endif %}`;
}

export function buildPlainText(
  template: string = '',
  rates: Rates,
  locale: string
) {
  if (!template.match(/{{amount}}/)) return template;
  const [head, tail] = template.split('{{amount}}');
  const content = groupByCurrency(currency => {
    const text = `{{suggested_ask_via_usd |multiply:"${
      rates[currency]
    }" |floatformat:"0"}}`;
    return renderToStaticMarkup(
      <Currency amount={0} locale={locale} currency={currency} />
    ).replace(/0/, text);
  });
  return `<p>${head}${content}${tail}</p>`;
}

export { buildLink } from './build-link';
