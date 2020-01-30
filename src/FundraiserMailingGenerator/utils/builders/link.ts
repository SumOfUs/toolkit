// @flow
import ButtonBuilder from './button';
import { Config } from './button';

export default class LinkBuilder extends ButtonBuilder {
  constructor(config: Config) {
    super(config);
    this.style = config.style;
  }
}
