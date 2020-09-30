// @flow

import axios from 'axios';
import { pick } from 'lodash';

const OXR_XR_URL = 'https://openexchangerates.org/api/latest.json';
const OXR_APP_ID = 'b35691a10625439b84bd3638ee37b741';
const SUPPORTED_CURRENCIES = ['AUD', 'CAD', 'CHF', 'EUR', 'GBP', 'NZD', 'USD', 'MXN', 'ARS'];

export type Rates = { [currency: string]: number };

export async function fetchRates(): Promise<Rates> {
  const resp = await axios.get(`${OXR_XR_URL}?app_id=${OXR_APP_ID}`);
  console.log('rates:', pick(resp.data.rates, SUPPORTED_CURRENCIES));
  return pick(resp.data.rates, SUPPORTED_CURRENCIES);
}
