import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { identity, pickBy } from 'lodash';
import UrlBuilder, { RecurringDefault } from './builders/url';
import TextBuilder from './builders/text';
import LinkBuilder from './builders/link';
import { Rates } from '../utils/exchange-rates';
import * as CSS from 'csstype';
import styles from './styles';

interface NonDonorSuggestedAmountsMarkup {
  url: string;
  locale: string;
  rates: Rates;
  template: string;
  correctLowAsks?: boolean;
  isButton?: boolean;
  styles?: any;
  recurringDefault: RecurringDefault;
  weekly: boolean;
}

interface DonorSuggestedAmountsMarkup {
  url: string;
  locale: string;
  rates: Rates;
  multipliers: number[];
  recurringDefault: RecurringDefault;
  weekly: boolean;
  oneClick: boolean;
  buttonTemplate: string;
  otherAmountTemplate: string;
  styles?: any;
}

export const donorSuggestedAmountsMarkup = (
  options: DonorSuggestedAmountsMarkup
) => {
  if (!options.rates) return '';
  const linkWithoutAmount = createLinkWithoutAmount(options);
  const markup = options.multipliers
    .map(multiplier => Number(multiplier))
    .filter(multiplier => multiplier > 0)
    .map(m => createButton(m, options))
    .concat([linkWithoutAmount])
    .join('');
  return markup;
};

export const createButton = (
  multiplier: number,
  options: DonorSuggestedAmountsMarkup
) => {
  // Donate {{amount}} now
  // Donate another amount
  const css = options.styles || styles.classic;

  const href = new UrlBuilder({
    url: options.url,
    config: pickBy(
      {
        multiplier: multiplier,
        locale: options.locale,
        rates: options.rates,
        recurringDefault: options.recurringDefault,
        weekly: options.weekly,
        oneClick: options.oneClick,
        correctLowAsks: true,
      },
      identity
    ),
  }).build();


  const text = new TextBuilder({
    multiplier,
    locale: options.locale,
    rates: options.rates,
    template: options.buttonTemplate,
    correctLowAsks: true,
  }).build();

  return renderLinkOrButtonStatic({
    style: css.buttonStyle,
    href,
    text,
  });
};

export const createLinkWithoutAmount = (
  options: DonorSuggestedAmountsMarkup
) => {
  const { url, recurringDefault, weekly, otherAmountTemplate } = options;
  const css = options.styles || styles.classic;
  
  const href = new UrlBuilder({
    url,
    config: pickBy(
      {
        weekly,
        recurringDefault,
        omitAmount: true,
      },
      identity
    ),
  }).build();
  

  return renderLinkOrButtonStatic({
    style: css.linkStyle,
    href,
    text: otherAmountTemplate,
  });
};

export const nonDonorSuggestedAmountsMarkup = (
  options: NonDonorSuggestedAmountsMarkup
) => {
  const { url, rates, locale, correctLowAsks, template, recurringDefault, weekly } = options;
  let style = options.isButton
    ? options.styles?.buttonStyle || styles.classic.buttonStyle
    : options.styles?.linkStyle || styles.classic.linkStyle;
  if (rates)
    return new LinkBuilder({
      url,
      template,
      rates,
      locale,
      correctLowAsks: correctLowAsks || false,
      omitAmount: false,
      style,
      recurringDefault,
      weekly
    }).build();

  throw new Error('Rates not loaded');
};

interface LinkOptions {
  href: string;
  text: string;
  style: CSS.Properties;
}
const renderLinkOrButtonStatic = (options: LinkOptions): string => {
  return renderToStaticMarkup(
    <a style={options.style} href="{{href}}">{`{{text}}`}</a>
  )
    .replace('{{href}}', options.href)
    .replace('{{text}}', options.text);
};
