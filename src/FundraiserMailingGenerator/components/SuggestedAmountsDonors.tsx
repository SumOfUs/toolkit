// @flow
import React, { Component, SyntheticEvent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button, Form, Icon } from 'react-bulma-components';
import classnames from 'classnames';
import { debounce, pickBy, identity } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import CopyButton from './CopyButton';
import UrlBuilder from '../utils/builders/url';
import TextBuilder from '../utils/builders/text';
import { RecurringDefault } from '../utils/builders/url';
import * as CSS from 'csstype';
import { Rates } from '../utils/exchange-rates';

type Translations = { [lang: string]: string };
type State = {
  multipliers: Array<string | number>;
  recurringDefault: RecurringDefault;
  oneClick: boolean;
  buttonTemplate: Translations;
  otherLinkTemplate: Translations;
  weekly: boolean;
};

type Props = {
  url: string;
  rates: Rates | null;
  lang: string;
  styles: { [key: string]: CSS.Properties };
};
export default class SuggestedAmountsDonors extends Component<Props, State> {
  _debouncedSave: any;
  static defaultState: State = {
    multipliers: [1, 1.5, 2, 0, 0],
    recurringDefault: '',
    weekly: false,
    oneClick: true,
    buttonTemplate: {
      en: `Donate {{amount}} now`,
      nl: 'Doneer nu {{amount}}',
      fr: `Donner {{amount}}`,
      de: `Jetzt {{amount}} Spenden`,
    },
    otherLinkTemplate: {
      en: `Donate another amount`,
      nl: `Doneer een ander bedrag`,
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

  updateMultipliers = (value: string, index: number) => {
    const multipliers = [...this.state.multipliers];
    if (value && !Number(value)) return;
    multipliers[index] = value;
    this.setState({ multipliers });
  };

  updateRecurringDefault = (e: SyntheticEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    if (
      value === '' ||
      value === 'recurring' ||
      value === 'only_recurring' ||
      value === 'only_one_off' ||
      value === 'one_off'
    ) {
      this.setState({ recurringDefault: value });
    }
  };

  handleWeeklyDonation = (event: SyntheticEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value === "true" ? true : false;
    this.setState({weekly: value });
  };

  resetState = () => this.setState(SuggestedAmountsDonors.defaultState);

  link = (multiplier: number): string => {
    const { lang, rates, url } = this.props;
    const { recurringDefault, oneClick, weekly } = this.state;
    if (!rates) return url;
    return new UrlBuilder({
      url,
      config: pickBy(
        {
          multiplier,
          locale: lang,
          rates,
          recurringDefault,
          weekly,
          oneClick,
          correctLowAsks: true,
        },
        identity
      ),
    }).build();
  };

  text = (multiplier: number): string => {
    const { lang, rates } = this.props;
    if (!rates) return '';
    return new TextBuilder({
      multiplier,
      locale: lang,
      rates,
      template: this.state.buttonTemplate[this.props.lang],
      correctLowAsks: true,
    }).build();
  };

  button = (multiplier?: number): string => {
    if (!multiplier) return '';
    return renderToStaticMarkup(
      <a style={this.props.styles.buttonStyle} href="{{link}}">{`{{text}}`}</a>
    )
      .replace('{{link}}', this.link(multiplier))
      .replace('{{text}}', this.text(multiplier));
  };

  otherAmountButton = () => {
    const link = new UrlBuilder({
      url: this.props.url,
      config: pickBy(
        {
          recurringDefault: this.state.recurringDefault,
          weekly: this.state.weekly,
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
    if (!this.props.rates) return '';
    const buttons = this.state.multipliers
      .map(number => Number(number))
      .map(this.button)
      .concat([this.otherAmountButton()])
      .join('');
    return `<div>${buttons}</div>`;
  };

  render() {
    return (
      <div className="SuggestedAmountsDonors tool-section">
        <Form.Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label">Button copy</label>
          </div>
          <div className="field-body">
            <Form.Input
              type="text"
              size="small"
              value={this.state.buttonTemplate[this.props.lang]}
              onChange={this.updateButtonTemplate}
            />
          </div>
        </Form.Field>
        <Form.Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label">Other amount copy</label>
          </div>
          <div className="field-body">
            <Form.Input
              type="text"
              size="small"
              value={this.state.otherLinkTemplate[this.props.lang]}
              onChange={this.updateOtherLinkTemplate}
            />
          </div>
        </Form.Field>

        <Form.Field className="is-horizontal">
          <div className="field-label">
            <label className="label">Multipliers</label>
          </div>
          <div className="field-body">
            {this.state.multipliers.map((amount, index) => (
              <Form.Control key={`amount-${index}`} className="field">
                <Form.Input
                  size="small"
                  name={`amount-${index}`}
                  value={amount?.toString() || ''}
                  className="is-info"
                  placeholder={`Amount ${index + 1}`}
                  type="text"
                  onChange={e =>
                    this.updateMultipliers(e.currentTarget.value, index)
                  }
                />
              </Form.Control>
            ))}
          </div>
        </Form.Field>
        <Form.Field className="is-horizontal is-grouped">
          <div className="field-label" />
          <div className="field-body">
            <p className="field has-text-right">
              Enter your multipliers here. 4 and 5 are optional.
            </p>
          </div>
        </Form.Field>

        <Form.Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label">Recurring</label>
          </div>
          <div className="field-body">
            <div className="select is-small">
              <select
                className="is-small"
                name="recurringDefault"
                value={this.state.recurringDefault}
                onChange={this.updateRecurringDefault}
              >
                <option value="">Use page default</option>
                <option value="recurring">Recurring</option>
                <option value="only_recurring">Only recurring</option>
                <option value="one_off">One off</option>
                <option value="only_one_off">Only One off</option>
              </select>
            </div>
          </div>
        </Form.Field>

        <Form.Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label">Allow Weekly</label>
          </div>
          <div className="field-body">
            <div className="select is-small">
              <select
                className="is-small"
                name="weekly"
                value={this.state.weekly ? "true" : "false"}
                onChange={this.handleWeeklyDonation}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </Form.Field>

        <Form.Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label" htmlFor="oneClick">
              One click?
            </label>
          </div>
          <div className="field-body">
            <div
              className={classnames('select', 'is-small', {
                'is-success': this.state.oneClick,
                'is-danger': !this.state.oneClick,
              })}
            >
              <select
                className="is-small"
                name="oneClick"
                value={this.state.oneClick ? 'true' : 'false'}
                onChange={e =>
                  this.setState({ oneClick: e.currentTarget.value === 'true' })
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
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
