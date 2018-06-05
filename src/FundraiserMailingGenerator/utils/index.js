// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mapValues } from 'lodash';
import queryString from 'query-string';
import Currency from '../components/Currency';
import currencyMap from './currency-map';
import type { Rates } from './exchange-rates';

import { buttonStyle, buttonWrapperStyle, linkStyle } from './styles';

// groupByCurrency creates
type CurrencyGroupIterator = (currency: string) => string;
export function groupByCurrency(fn: CurrencyGroupIterator) {
  return Object.keys(currencyMap)
    .map((currency, index) => {
      const countries = currencyMap[currency];
      const ifelseif = index === 0 ? 'if' : 'elif';
      const checks = countries.map(c => `user.country == "${c}"`).join(' or ');
      return `{% ${ifelseif} ${checks} %}${fn(currency)}`;
    })
    .concat([`{% else %}${fn('USD')}{% endif %}`])
    .join('');
}

type PlainTextOpts = {
  template: string,
  rates: Rates,
  lang: string,
};
function suggestedAmountText({ template = '', rates, lang }: PlainTextOpts) {
  if (!template.match(/{{amount}}/)) return template;
  const [head, tail] = template.split('{{amount}}');
  const iterator = currency => {
    const text = `{{suggested_ask_via_usd |multiply:"${
      rates[currency]
    }" |floatformat:"0"}}`;
    return renderToStaticMarkup(
      <Currency amount={0} locale={lang} currency={currency} />
    ).replace(/0/, text);
  };
  const content = groupByCurrency(iterator);
  return `${head}{% if suggested_ask_via_usd < 51 %}${content}{% endif %}${tail}`;
}
export function buildPlainText({ template = '', rates, lang }: PlainTextOpts) {
  return `<p>${suggestedAmountText({ template, rates, lang })}</p>`;
}

export type BuildLinkOptions = {
  template: string,
  rates: Rates,
  url: string,
  lang: string,
};
function suggestedAmountLink(options: BuildLinkOptions, style: any) {
  const { template, rates, lang } = options;
  return renderToStaticMarkup(
    <a style={style} title="SumOfUs" href="{{url}}">
      {`{{text}}`}
    </a>
  );
}

export function buildLink(options: BuildLinkOptions) {
  const { template, rates, lang } = options;
  const query = queryString.stringify(
    {
      donation_band: donationBandSnippet(),
      source: 'fwd',
    },
    { encode: false, strict: false }
  );
  const url = `${options.url}?${query}`;
  const result = renderToStaticMarkup(<p>{`{{content}}`}</p>);
  const content = suggestedAmountLink(options, linkStyle)
    .replace('{{text}}', suggestedAmountText({ template, rates, lang }))
    .replace('{{url}}', url);
  return result.replace('{{content}}', content);
}

export function buildButton(options: BuildLinkOptions): string {
  const { template, rates, lang } = options;
  const query = queryString.stringify(
    {
      donation_band: donationBandSnippet(),
      source: 'fwd',
    },
    { encode: false, strict: false }
  );
  const url = `${options.url}?${query}`;
  const result = renderToStaticMarkup(
    <div style={buttonWrapperStyle} align="center">
      <center>{`{{content}}`}</center>
    </div>
  );

  const content = suggestedAmountLink(options, buttonStyle)
    .replace('{{text}}', suggestedAmountText({ template, rates, lang }))
    .replace('{{url}}', url);

  return result.replace('{{content}}', content);
}

function donationBandSnippet() {
  return `{% if suggested_ask_via_usd <= 1 %}nondonor{% elif suggested_ask_via_usd <= 19 %}lowdonor{% elif suggested_ask_via_usd <= 50 %}middonor{% elif suggested_ask_via_usd <= 100 %}highdonor{% else %}vhighdonor{% endif %}`;
}
