import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { identity, pickBy } from 'lodash';
import UrlBuilder from './builders/url';
import TextBuilder from './builders/text';
import { Rates } from '../utils/exchange-rates';
import styles from './styles';

interface DonorSuggestedAmountsMarkup {
  url: string;
  locale: string;
  rates: Rates;
  multipliers: number[];
  recurringDefault: boolean;
  oneClick: boolean;
  buttonTemplate: string;
  otherAmountTemplate: string;
  styles?: any;
}
export const donorSuggestedAmountsMarkup = (
  options: DonorSuggestedAmountsMarkup
) => {
  if (!options.rates) return '';
  const markup = options.multipliers
    .map(multiplier => Number(multiplier))
    .map(multiplier => createButton(multiplier, options))
    .concat([createButtonWithoutAmount(options)])
    .join('');
  return markup;
};

export const createButton = (
  multiplier: number,
  options: DonorSuggestedAmountsMarkup
) => {
  if (!multiplier) return '';
  let css = options.styles || styles.classic;
  return renderToStaticMarkup(
    <a style={css.buttonStyle} href="{{href}}">{`{{text}}`}</a>
  )
    .replace('{{href}}', hrefMarkup(multiplier, options))
    .replace('{{text}}', textMarkup(multiplier, options));
};

export const createButtonWithoutAmount = (
  options: DonorSuggestedAmountsMarkup
) => {
  const { url, recurringDefault, otherAmountTemplate } = options;
  const css = options.styles || styles.classic;
  const link = new UrlBuilder({
    url,
    config: pickBy(
      {
        recurringDefault,
        omitAmount: true,
      },
      identity
    ),
  }).build();

  const text = otherAmountTemplate;
  return renderToStaticMarkup(
    <a style={css.linkStyle} href="{{link}}">{`{{text}}`}</a>
  )
    .replace('{{link}}', link)
    .replace('{{text}}', text);
};

export const hrefMarkup = (
  multiplier: number,
  options: DonorSuggestedAmountsMarkup
): string => {
  const { recurringDefault, oneClick, locale, rates, url } = options;
  if (!rates) return url;
  return new UrlBuilder({
    url,
    config: pickBy(
      {
        multiplier,
        locale,
        rates,
        recurringDefault,
        oneClick,
        correctLowAsks: true,
      },
      identity
    ),
  }).build();
};

export const textMarkup = (
  multiplier: number,
  options: DonorSuggestedAmountsMarkup
): string => {
  const { locale, rates } = options;
  if (!rates) return '';
  return new TextBuilder({
    multiplier,
    locale,
    rates,
    template: options.buttonTemplate,
    correctLowAsks: true,
  }).build();
};
