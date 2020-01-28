// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Rates } from '../exchange-rates';
import TextBuilder from './text';
import UrlBuilder from './url';
import * as CSS from 'csstype';

export type Config = {
  url: string;
  template: string;
  locale: string;
  rates: Rates;
  amount?: number;
  multiplier?: number;
  correctLowAsks?: boolean;
  omitAmount?: boolean;
  style: CSS.Properties;
};

export default class ButtonBuilder {
  config: Config;
  style: any;

  constructor(config: Config) {
    this.config = config;
    this.style = config.style;
  }

  build = () => {
    const {
      url,
      template,
      locale,
      rates,
      amount,
      multiplier,
      correctLowAsks,
      omitAmount,
    } = this.config;
    const urlConfig = {
      url,
      config: {
        locale,
        rates,
        amount,
        multiplier,
        correctLowAsks,
        omitAmount,
      },
    };
    const textConfig = {
      template,
      locale,
      rates,
      amount,
      multiplier,
      correctLowAsks,
    };
    return renderToStaticMarkup(
      <a style={this.style} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', new UrlBuilder(urlConfig).build())
      .replace('{{text}}', new TextBuilder(textConfig).build());
  };
}
