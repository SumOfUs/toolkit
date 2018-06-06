// @flow
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button, Control, Field, Icon, Input } from 'reactbulma';
import { debounce, includes } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import CopyButton from '../components/CopyButton';
import UrlBuilder from '../utils/builders/url';
import TextBuilder from '../utils/builders/text';
import { buttonStyle, linkStyle } from '../utils/styles';
import type { State as Props } from '../BaseComponent';
import type { RecurringDefault } from '../utils/builders/url';

type Translations = { [lang: string]: string };
type State = {
  amounts: Array<number | void>,
  recurringDefault: RecurringDefault,
  buttonTemplate: Translations,
  otherLinkTemplate: Translations,
};
export default class SuggestedAmountsDonors extends Component<Props, State> {
  _debouncedSave: any;
  static defaultState: State = {
    amounts: [4, 8, 20, undefined, undefined],
    recurringDefault: 'default',
    buttonTemplate: {
      en: `Donate {{amount}} now`,
      fr: `Donner {{amount}}`,
      de: `Jetzt {{amount}} Spenden`,
    },
    otherLinkTemplate: {
      en: `Donate another amount`,
      fr: `Doner un autre montant`,
      de: `Spenden Sie einen anderen Betrag`,
    },
  };
  constructor(props: Props) {
    super(props);
    this.state = hydrate(
      'SuggestedAmountsDonors',
      SuggestedAmountsDonors.defaultState
    );
  }

  componentDidUpdate() {
    this._debouncedSave = this.saveState();
  }

  componentWillUnmount() {
    if (this._debouncedSave) this._debouncedSave.flush();
  }

  saveState = debounce(() => save('SuggestedAmountsDonors', this.state), 500);

  updateButtonTemplate = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      buttonTemplate: {
        ...this.state.buttonTemplate,
        [this.props.lang]: e.target.value,
      },
    });
  };

  updateOtherLinkTemplate = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      otherLinkTemplate: {
        ...this.state.otherLinkTemplate,
        [this.props.lang]: e.target.value,
      },
    });
  };

  updateAmount = (value: string, index: number) => {
    const amounts = [...this.state.amounts];
    amounts[index] = Number(value) || undefined;
    this.setState({ amounts });
  };

  updateRecurringDefault = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (
      value === 'default' ||
      value === 'recurring' ||
      value === 'only_recurring' ||
      value === 'one_off'
    ) {
      this.setState({
        recurringDefault: value,
      });
    }
  };

  resetState = () => this.setState(SuggestedAmountsDonors.defaultState);

  link = (amount: number): string => {
    const { lang, rates, url } = this.props;
    const { recurringDefault } = this.state;
    if (!rates) return url;
    return new UrlBuilder({
      url,
      config: { amount, locale: lang, rates, recurringDefault },
    }).build();
  };

  text = (amount: number): string => {
    const { lang, rates } = this.props;
    if (!rates) return '';
    return new TextBuilder({
      amount,
      locale: lang,
      rates,
      template: this.state.buttonTemplate[this.props.lang],
    }).build();
  };

  button = (amount?: number): string => {
    if (!amount) return '';
    return renderToStaticMarkup(
      <a style={buttonStyle} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', this.link(amount))
      .replace('{{text}}', this.text(amount));
  };

  otherAmountButton = () => {
    const link = new UrlBuilder({ url: this.props.url }).build();
    const text = this.state.otherLinkTemplate[this.props.lang];
    return renderToStaticMarkup(
      <a style={linkStyle} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', link)
      .replace('{{text}}', text);
  };

  copy = () => {
    const { url, rates, lang } = this.props;
    if (!rates) return '';
    return this.state.amounts
      .map(this.button)
      .concat([this.otherAmountButton()])
      .join('');
  };

  render() {
    return (
      <div className="SuggestedAmountsDonors tool-section">
        <Field>
          <label className="label">Link and button copy</label>
          <Input
            type="text"
            small
            value={this.state.buttonTemplate[this.props.lang]}
            onChange={this.updateButtonTemplate}
          />
        </Field>
        <Field>
          <label className="label">Other amount copy</label>
          <Input
            type="text"
            small
            value={this.state.otherLinkTemplate[this.props.lang]}
            onChange={this.updateOtherLinkTemplate}
          />
        </Field>

        <label className="label">
          Enter your amounts here. 4 and 5 are optional. Each will create a
          button.
        </label>

        <Field className="is-grouped is-grouped-multiline">
          {this.state.amounts.map((amount, index) => (
            <Control key={`amount-${index}`}>
              <Input
                small
                name={`amount-${index}`}
                value={amount || ''}
                className="is-info"
                placeholder={`Amount ${index + 1}`}
                type="text"
                onChange={e => this.updateAmount(e.target.value, index)}
              />
            </Control>
          ))}
        </Field>
        <Field>
          <label className="label">Recurring default</label>
          <div className="select">
            <select
              name="recurringDefault"
              value={this.state.recurringDefault}
              onChange={this.updateRecurringDefault}
            >
              <option value="default">Use page default</option>
              <option value="recurring">Recurring</option>
              <option value="only_recurring">Only recurring</option>
              <option value="one_off">One off</option>
            </select>
          </div>
        </Field>
        <div className="level">
          <CopyButton textFn={this.copy} disabled={!this.props.rates} />
          <Button onClick={this.resetState}>
            <Icon small>
              <i className="fas fa-sync" />
            </Icon>
            <span>Reset</span>
          </Button>
        </div>
      </div>
    );
  }
}
