// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Rates } from '../exchange-rates';
import ButtonBuilder from './button';
import type { Config } from './button';
import { linkStyle } from '../styles';

export default class LinkBuilder extends ButtonBuilder {
  config: Config;

  constructor(config: Config) {
    super(config);
    this.style = linkStyle;
  }
}
