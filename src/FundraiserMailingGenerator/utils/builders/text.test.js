// @flow
import TextBuilder from './text';

const configWithoutAmount = {
  template: 'Donate {{amount}} now',
  locale: 'en',
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

const configWithAmount = { ...configWithoutAmount, amount: 10 };

describe('TextBuilder', () => {
  describe('#build', () => {
    test('simply returns the template if no {{amount}} detected', () => {
      const text = new TextBuilder({
        ...configWithoutAmount,
        template: 'Hello',
      });
      expect(text.build()).toEqual('Hello');
    });

    test('uses `suggested_ask_via_usd` if not initialised with an amount', () => {
      const text = new TextBuilder(configWithoutAmount);
      expect(text.build()).toEqual(
        expect.stringMatching(/^Donate {% if .+ endif %} now$/)
      );
      expect(text.build()).toEqual(
        expect.stringContaining(
          `{{suggested_ask_via_usd|multiply:1.3|floatformat:0}}`
        )
      );
      expect(text.build()).toEqual(
        expect.stringContaining(
          `{{suggested_ask_via_usd|multiply:1|floatformat:0}}`
        )
      );
    });

    test('uses the converted amount if initialised with an amount', () => {
      const text = new TextBuilder(configWithAmount);
      expect(text.build()).toEqual(
        expect.stringMatching(/^Donate {% if .+ endif %} now$/)
      );
      expect(text.build()).toEqual(expect.stringContaining('$10'));
      expect(text.build()).toEqual(expect.stringContaining('€9'));
      expect(text.build()).toEqual(expect.stringContaining('£7'));
      expect(text.build()).toEqual(expect.stringContaining('CA$13'));
    });

    test(`also works when there's no tail`, () => {
      const text = new TextBuilder({
        ...configWithAmount,
        template: 'Donate {{amount}}',
      });
      expect(text.build()).toEqual(
        expect.stringMatching(/^Donate {% if .+ endif %}$/)
      );
      expect(text.build()).toEqual(expect.stringContaining('$10'));
      expect(text.build()).toEqual(expect.stringContaining('€9'));
      expect(text.build()).toEqual(expect.stringContaining('£7'));
      expect(text.build()).toEqual(expect.stringContaining('CA$13'));
    });

    test('localizes the currency format in french', () => {
      const text = new TextBuilder({
        ...configWithAmount,
        locale: 'fr',
      });
      expect(text.build()).toEqual(expect.stringContaining('10 $US'));
      expect(text.build()).toEqual(expect.stringContaining('9 €'));
      expect(text.build()).toEqual(expect.stringContaining('7 £'));
      expect(text.build()).toEqual(expect.stringContaining('13 $CA'));
    });

    test('localizes the currency format in french', () => {
      const text = new TextBuilder({
        ...configWithAmount,
        locale: 'fr',
      });
      expect(text.build()).toEqual(expect.stringContaining('10 $US'));
      expect(text.build()).toEqual(expect.stringContaining('9 €'));
      expect(text.build()).toEqual(expect.stringContaining('7 £'));
      expect(text.build()).toEqual(expect.stringContaining('13 $CA'));
    });
  });

  describe('#amount', () => {});
});
