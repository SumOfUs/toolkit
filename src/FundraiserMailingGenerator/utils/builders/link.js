// @flow
import ButtonBuilder from './button';
import type { Config } from './button';

export default class LinkBuilder extends ButtonBuilder {
  config: Config;

  constructor(config: Config) {
    super(config);
    this.style = config.style;
  }
}
