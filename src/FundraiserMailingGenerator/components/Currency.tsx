// @flow
import React, { Fragment } from 'react';
import { IntlProvider, FormattedNumber } from 'react-intl';

type Props = {
  locale?: string;
  amount: number;
  currency: string;
};
export default function Currency({ locale, amount, currency }: Props) {
  return (
    <IntlProvider textComponent={Fragment} locale={locale || 'en-US'}>
      <FormattedNumber
        value={amount}
        style="currency"
        currency={currency}
        minimumFractionDigits={0}
        maximumFractionDigits={2}
      />
    </IntlProvider>
  );
}
