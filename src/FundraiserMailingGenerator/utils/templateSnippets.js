// @flow
import { currencyMap } from './currencyMap';

export function donationBandSnippet(): string {
  return [
    `{% if suggested_ask_via_usd <= 1 %}nondonor`,
    `{% elif suggested_ask_via_usd <= 19 %}lowdonor`,
    `{% elif suggested_ask_via_usd <= 50 %}middonor`,
    `{% elif suggested_ask_via_usd <= 100 %}highdonor`,
    `{% else %}vhighdonor{% endif %}`,
  ].join('');
}

export function groupByCurrency(fn: (currency: string) => string) {
  return Object.keys(currencyMap)
    .map((currency, i) => {
      const countries = currencyMap[currency];
      const ifelif = i === 0 ? 'if' : 'elif';
      const checks = countries.map(c => `user.country == "${c}"`).join(' or ');
      return `{% ${ifelif} ${checks} %}${fn(currency)}`;
    })
    .concat([`{% else %}${fn('USD')}{% endif %}`])
    .join('');
}
