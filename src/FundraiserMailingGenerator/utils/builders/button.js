// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Rates } from '../exchange-rates';
import TextBuilder from './text';
import UrlBuilder from './url';
import { buttonStyle } from '../styles';

type Config = {
  url: string,
  template: string,
  locale: string,
  rates: Rates,
  amount?: number,
  multiplier?: number,
};

export default class ButtonBuilder {
  config: Config;
  style: any;

  constructor(config: Config) {
    this.config = config;
    this.style = buttonStyle;
  }

  build = () => {
    const { url, template, locale, rates, amount, multiplier } = this.config;
    const urlConfig = { url, locale, rates, amount, multiplier };
    const textConfig = { template, locale, rates, amount, multiplier };
    return renderToStaticMarkup(
      <a style={this.style} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', new UrlBuilder(urlConfig).build())
      .replace('{{text}}', new TextBuilder(textConfig).build());
  };
}
