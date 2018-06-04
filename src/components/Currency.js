// @flow
import React, { Fragment } from 'react';
import { addLocaleData, IntlProvider, FormattedNumber } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
addLocaleData([...en, ...fr, ...es]);

type Props = {
  locale?: string,
  amount: number,
  currency: string,
};
export default function Currency({ locale, amount, currency }: Props) {
  return (
    <IntlProvider textComponent={React.Fragment} locale={locale || 'en-US'}>
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
