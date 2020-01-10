// @flow
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button, Control, Field, Icon, Input } from 'reactbulma';
import classnames from 'classnames';
import { debounce, pickBy, identity } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import CopyButton from '../components/CopyButton';
import UrlBuilder from '../utils/builders/url';
import TextBuilder from '../utils/builders/text';
import type { State as Props } from '../BaseComponent';
import type { RecurringDefault } from '../utils/builders/url';

type Translations = { [lang: string]: string };
type State = {
  multipliers: Array<string | number | void>,
  recurringDefault: RecurringDefault,
  oneClick: boolean,
  buttonTemplate: Translations,
  otherLinkTemplate: Translations,
};
export default class SuggestedAmountsDonors extends Component<Props, State> {
  _debouncedSave: any;
  static defaultState: State = {
    multipliers: [1, 1.5, 2, undefined, undefined],
    recurringDefault: '',
    oneClick: true,
    buttonTemplate: {
      en: `Donate {{amount}} now`,
      fr: `Donner {{amount}}`,
      de: `Jetzt {{amount}} Spenden`,
      es: `Dona {{amount}} ahora`,
    },
    otherLinkTemplate: {
      en: `Donate another amount`,
      fr: `Doner un autre montant`,
      de: `Spenden Sie einen anderen Betrag`,
      es: `Dona otra cantidad`,
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

  updateMultipliers = (value: string, index: number) => {
    const multipliers = [...this.state.multipliers];
    if (value && !Number(value)) return;
    multipliers[index] = value;
    this.setState({ multipliers });
  };

  updateRecurringDefault = (e: SyntheticInputEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (
      value === '' ||
      value === 'recurring' ||
      value === 'only_recurring' ||
      value === 'one_off'
    ) {
      this.setState({ recurringDefault: value });
    }
  };

  resetState = () => this.setState(SuggestedAmountsDonors.defaultState);

  link = (multiplier: number): string => {
    const { lang, rates, url } = this.props;
    const { recurringDefault, oneClick } = this.state;
    if (!rates) return url;
    return new UrlBuilder({
      url,
      config: pickBy(
        {
          multiplier,
          locale: lang,
          rates,
          recurringDefault,
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
        <Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label">Button copy</label>
          </div>
          <div className="field-body">
            <Input
              type="text"
              small
              value={this.state.buttonTemplate[this.props.lang]}
              onChange={this.updateButtonTemplate}
            />
          </div>
        </Field>
        <Field className="is-horizontal is-grouped">
          <div className="field-label">
            <label className="label">Other amount copy</label>
          </div>
          <div className="field-body">
            <Input
              type="text"
              small
              value={this.state.otherLinkTemplate[this.props.lang]}
              onChange={this.updateOtherLinkTemplate}
            />
          </div>
        </Field>

        <Field className="is-horizontal">
          <div className="field-label">
            <label className="label">Multipliers</label>
          </div>
          <div className="field-body">
            {this.state.multipliers.map((amount, index) => (
              <Control key={`amount-${index}`} className="field">
                <Input
                  small
                  name={`amount-${index}`}
                  value={amount || ''}
                  className="is-info"
                  placeholder={`Amount ${index + 1}`}
                  type="text"
                  onChange={e => this.updateMultipliers(e.target.value, index)}
                />
              </Control>
            ))}
          </div>
        </Field>
        <Field className="is-horizontal is-grouped">
          <div className="field-label" />
          <div className="field-body">
            <p className="field has-text-right">
              Enter your multipliers here. 4 and 5 are optional.
            </p>
          </div>
        </Field>

        <Field className="is-horizontal is-grouped">
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
              </select>
            </div>
          </div>
        </Field>

        <Field className="is-horizontal is-grouped">
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
                value={this.state.oneClick}
                onChange={e =>
                  this.setState({ oneClick: e.target.value === 'true' })
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
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
