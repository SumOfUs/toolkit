// @flow
import UrlBuilder from './url';

const config = {
  amount: 10,
  rates: {
    AUD: 1.3,
    CAD: 1.29,
    CHF: 0.99,
    EUR: 0.85,
    GBP: 0.74,
    NZD: 1.42,
    USD: 1,
  },
};

describe('UrlBuilder', () => {
  test('has default value', () => {
    const url = new UrlBuilder();
    expect(url.url).toEqual('https://actions.eko.org/a/donate');
  });

  test('can be passed a custom url', () => {
    const url = new UrlBuilder({
      url: 'https://actions.eko.org/a/donate2',
    });
    expect(url.url).toEqual('https://actions.eko.org/a/donate2');
  });

  describe('.query', () => {
    test('uses suggested_ask_via_usd by default', () => {
      const url = new UrlBuilder();
      expect(url.query).toEqual(
        expect.stringContaining('suggested_ask_via_usd')
      );
    });

    test(`is not URL a encoded string`, () => {
      const url = new UrlBuilder();
      expect(url.query).toEqual(expect.stringContaining('{% endif %}'));
    });
  });

  describe('#build', () => {
    test('builds the basic donation url by default', () => {
      const url = new UrlBuilder();
      expect(url.build()).toEqual(expect.stringContaining(url.url));
      expect(url.build()).toEqual(expect.stringContaining(url.query));
    });

    test('can also build with an amount and a currency', () => {
      const url = new UrlBuilder({ config }).build();
      expect(url).not.toEqual(expect.stringContaining('suggested_ask_via_usd'));
      expect(url).toEqual(expect.stringContaining('amount={% if'));
      expect(url).toEqual(expect.stringContaining('currency='));
    });

    test('supports adding a recurring_default value', () => {
      let url = new UrlBuilder({
        config: { ...config, recurringDefault: 'recurring' },
      }).build();
      expect(url).toEqual(
        expect.stringContaining('recurring_default=recurring')
      );

      url = new UrlBuilder({
        config: { ...config, recurringDefault: 'one_off' },
      }).build();
      expect(url).toEqual(expect.stringContaining('recurring_default=one_off'));
    });

    test('supports adding a one_click value', () => {
      let url = new UrlBuilder({
        config: { ...config, oneClick: true },
      });
      expect(url.build()).toEqual(expect.stringContaining('one_click=true'));
      expect(new UrlBuilder({ config }).build()).not.toEqual(
        expect.stringContaining('one_click=true')
      );
    });
  });

  describe('#amount', () => {
    test('is an empty string if no currency is passed', () => {
      const url = new UrlBuilder();
      expect(url.amount()).toEqual('');
    });

    test(`is an empty string if the instance doesn't have a config`, () => {
      const url = new UrlBuilder();
      expect(url.amount('USD')).toEqual('');
    });

    test(`is an empty string if the instance doesn't have an exchange rate for the given currency`, () => {
      const url = new UrlBuilder({ config });
      expect(url.amount('YEN')).toEqual('');
    });

    test('is a jinja template with an amount, a multiplier, and a floatformat', () => {
      const url = new UrlBuilder({ config });
      expect(url.amount('AUD')).toEqual('{{10|multiply:1.3|floatformat:0}}');
      expect(url.amount('CAD')).toEqual('{{10|multiply:1.29|floatformat:0}}');
      expect(url.amount('CHF')).toEqual('{{10|multiply:0.99|floatformat:0}}');
      expect(url.amount('EUR')).toEqual('{{10|multiply:0.85|floatformat:0}}');
      expect(url.amount('GBP')).toEqual('{{10|multiply:0.74|floatformat:0}}');
      expect(url.amount('USD')).toEqual('{{10|multiply:1|floatformat:0}}');
    });
  });
});
