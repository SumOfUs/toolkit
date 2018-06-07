// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Rates } from '../exchange-rates';
import TextBuilder from './text';
import UrlBuilder from './url';
import ButtonBuilder from './button';
import { linkStyle } from '../styles';

type Config = {
  url: string,
  template: string,
  locale: string,
  rates: Rates,
  amount?: number,
  multiplier?: number,
};

export default class LinkBuilder extends ButtonBuilder {
  config: Config;

  constructor(config: Config) {
    super(config);
    this.style = linkStyle;
  }
}
