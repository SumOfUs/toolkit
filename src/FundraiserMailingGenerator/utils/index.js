// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mapValues } from 'lodash';
import queryString from 'query-string';
import Currency from '../components/Currency';
import currencyMap from './currencyMap';
import type { Rates } from './exchange-rates';
import UrlBuilder from './builders/url';
import { groupByCurrency, donationBandSnippet } from './templateSnippets';
import { buttonStyle, buttonWrapperStyle, linkStyle } from './styles';

// groupByCurrency creates

type PlainTextOpts = {
  template: string,
  rates: Rates,
  lang: string,
};
function suggestedAmountText({ template = '', rates, lang }: PlainTextOpts) {
  if (!template.match(/{{amount}}/)) return template;
  const [head, tail] = template.split('{{amount}}');
  const iterator = currency => {
    const text = `{{suggested_ask_via_usd|multiply:${
      rates[currency]
    }|floatformat:0}}`;
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
  const result = renderToStaticMarkup(<p>{`{{content}}`}</p>);
  const content = suggestedAmountLink(options, linkStyle)
    .replace('{{text}}', suggestedAmountText({ template, rates, lang }))
    .replace('{{url}}', new UrlBuilder({ url: options.url }).build());
  return result.replace('{{content}}', content);
}

export function buildButton(options: BuildLinkOptions): string {
  const { template, rates, lang } = options;
  const content = suggestedAmountLink(options, buttonStyle)
    .replace('{{text}}', suggestedAmountText({ template, rates, lang }))
    .replace('{{url}}', new UrlBuilder({ url: options.url }).build());
  const result = renderToStaticMarkup(
    <div style={buttonWrapperStyle} align="center">
      <center>{`{{content}}`}</center>
    </div>
  );
  return result.replace('{{content}}', content);
}
