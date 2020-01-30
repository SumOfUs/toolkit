import React, { Component, SyntheticEvent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button, Form, Icon } from 'react-bulma-components';
import { debounce, pickBy, identity } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import CopyButton from './CopyButton';
import UrlBuilder from '../utils/builders/url';
import TextBuilder from '../utils/builders/text';
import { RecurringDefault } from '../utils/builders/url';
import { Rates } from '../utils/exchange-rates';
import * as CSS from 'csstype';

type Translations = { [lang: string]: string };
type State = {
  amounts: number[];
  recurringDefault: RecurringDefault;
  buttonTemplate: Translations;
  otherLinkTemplate: Translations;
};
type Props = {
  url: string;
  rates: Rates | null;
  lang: string;
  styles: { [key: string]: CSS.Properties };
};
export default class FixedAmountCreator extends Component<Props, State> {
  _debouncedSave: any;
  static defaultState: State = {
    amounts: [4, 8, 20, 0, 0],
    recurringDefault: '',
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
    this.state = hydrate('FixedAmountCreator', FixedAmountCreator.defaultState);
  }

  componentDidUpdate() {
    this._debouncedSave = this.saveState();
  }

  componentWillUnmount() {
    if (this._debouncedSave) this._debouncedSave.flush();
  }

  saveState = debounce(() => save('FixedAmountCreator', this.state), 500);

  updateButtonTemplate = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      buttonTemplate: {
        ...this.state.buttonTemplate,
        [this.props.lang]: e.currentTarget.value,
      },
    });
  };

  updateOtherLinkTemplate = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      otherLinkTemplate: {
        ...this.state.otherLinkTemplate,
        [this.props.lang]: e.currentTarget.value,
      },
    });
  };

  updateAmount = (value: string, index: number) => {
    const amounts = [...this.state.amounts];
    amounts[index] = Number(value) || 0;
    this.setState({ amounts });
  };

  updateRecurringDefault = (e: SyntheticEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    if (
      value === '' ||
      value === 'recurring' ||
      value === 'only_recurring' ||
      value === 'one_off'
    ) {
      this.setState({
        recurringDefault: value,
      });
    }
  };

  resetState = () => this.setState(FixedAmountCreator.defaultState);

  link = (amount: number): string => {
    const { lang, rates, url } = this.props;
    const { recurringDefault } = this.state;
    if (!rates) return url;
    return new UrlBuilder({
      url,
      config: pickBy(
        { amount, locale: lang, rates, recurringDefault },
        identity
      ),
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
      <a style={this.props.styles.buttonStyle} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', this.link(amount))
      .replace('{{text}}', this.text(amount));
  };

  otherAmountButton = () => {
    const link = new UrlBuilder({
      url: this.props.url,
      config: pickBy(
        {
          recurringDefault: this.state.recurringDefault,
          omitAmount: true,
        },
        identity
      ),
    }).build();
    const text = this.state.otherLinkTemplate[this.props.lang];
    return renderToStaticMarkup(
      <a style={this.props.styles.linkStyle} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', link)
      .replace('{{text}}', text);
  };

  copy = () => {
    const { rates } = this.props;
    if (!rates) return '';
    return this.state.amounts
      .map(amount => this.button(amount))
      .concat([this.otherAmountButton()])
      .join('');
  };

  render() {
    return (
      <div className="FixedAmountCreator tool-section">
        <Form.Field>
          <label className="label">Button copy</label>
          <Form.Input
            type="text"
            size="small"
            value={this.state.buttonTemplate[this.props.lang]}
            onChange={this.updateButtonTemplate}
          />
        </Form.Field>
        <Form.Field>
          <label className="label">Other amount copy</label>
          <Form.Input
            type="text"
            size="small"
            value={this.state.otherLinkTemplate[this.props.lang]}
            onChange={this.updateOtherLinkTemplate}
          />
        </Form.Field>

        <label className="label">
          Enter your amounts here. 4 and 5 are optional. Each will create a
          button.
        </label>

        <Form.Field className="is-grouped is-grouped-multiline">
          {this.state.amounts.map((amount, index) => (
            <Form.Control key={`amount-${index}`}>
              <Form.Input
                size="small"
                name={`amount-${index}`}
                value={amount ? amount.toString() : ''}
                className="is-info"
                placeholder={`Amount ${index + 1}`}
                type="text"
                onChange={e => this.updateAmount(e.currentTarget.value, index)}
              />
            </Form.Control>
          ))}
        </Form.Field>
        <Form.Field>
          <label className="label">Recurring default</label>
          <div className="select">
            <select
              name="recurringDefault"
              value={this.state.recurringDefault}
              onChange={this.updateRecurringDefault}
            >
              <option value="">Use page default</option>
              <option value="recurring">Recurring</option>
              <option value="only_recurring">Only recurring</option>
              <option value="one_off">One off</option>
            </select>
          </div>
        </Form.Field>
        <div className="level">
          <CopyButton textFn={this.copy} disabled={!this.props.rates} />
          <Button onClick={this.resetState}>
            <Icon size="small">
              <i className="fas fa-sync" />
            </Icon>
            <span>Reset</span>
          </Button>
        </div>
      </div>
    );
  }
}
