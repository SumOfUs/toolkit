// @flow
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Rates } from '../exchange-rates';
import TextBuilder from './text';
import UrlBuilder from './url';
import * as CSS from 'csstype';
import { RecurringDefault } from './url';

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
  recurringDefault?: RecurringDefault;
};

export default class ButtonBuilder {
  config: Config;
  style: any;
  recurringDefault: RecurringDefault | undefined;

  constructor(config: Config) {
    this.config = config;
    this.style = config.style;
    this.recurringDefault = config.recurringDefault;
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
      recurringDefault,
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
        recurringDefault
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
