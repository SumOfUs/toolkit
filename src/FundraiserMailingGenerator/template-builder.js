// @flow

import { currencyMap } from './utils/currency-map';

type RecurringDefault = 'default' | 'recurring' | 'only_recurring' | 'one_off';

type DonorTemplateBuilderOptions = {
  url: ?string,
  amounts: number[],
  language: string,
  recurringDefault: RecurringDefault,
  recurring: boolean,
};

export class DonorTemplateBuilder {
  options: DonorTemplateBuilderOptions;
  constructor(options: DonorTemplateBuilderOptions) {
    this.options = options;
  }

  textTemplate(template?: string) {}

  buttonTemplate() {}

  boxTemplate() {}

  linkTemplate(template?: string) {}

  otherAmountTemplate(template?: string) {}
}

export class NonDonorTemplateBuilder {
  linkTemplate(template?: string): string {
    if (!template) return '';
    return '';
  }

  plainTextTemplate(template?: string): string {
    if (!template) return '';
    return '';
  }
}
