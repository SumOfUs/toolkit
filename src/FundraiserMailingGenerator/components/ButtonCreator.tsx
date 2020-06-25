import React, { Component, SyntheticEvent } from 'react';
import { debounce, isEqual } from 'lodash';
import * as CSS from 'csstype';
import InputWithActions from './InputWithActions';
import { hydrate, save } from '../state/localStorage';
import ButtonBuilder from '../utils/builders/button';
import { Rates } from '../utils/exchange-rates';
import { RecurringDefault } from '../utils/builders/url';

type State = {
  template: { [lang: string]: string };
  recurring: string;
};

type Props = {
  correctLowAsks?: boolean;
  url: string;
  rates: Rates | null;
  lang: string;
  styles: { [key: string]: CSS.Properties };
  recurringDefault: RecurringDefault;
  weekly: boolean;
};

export default class ButtonCreator extends Component<Props, State> {
  _debouncedSave: any;

  static defaultState = {
    template: {
      en: 'Donate {{amount}} now',
      fr: 'Donner {{amount}}',
      de: 'Jetzt {{amount}} Spenden',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = hydrate('ButtonCreator', ButtonCreator.defaultState);
  }

  get template() {
    return this.state.template[this.props.lang];
  }

  componentDidUpdate() {
    this._debouncedSave = this.saveState();
  }

  componentWillUnmount() {
    if (this._debouncedSave) this._debouncedSave.flush();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (!isEqual(this.state, nextState)) return true;
    return this.props.lang !== nextProps.lang;
  }

  saveState = debounce(() => save('ButtonCreator', this.state), 1500);

  updateTemplate = (data: { [key: string]: string }) => {
    this.setState({ template: { ...this.state.template, ...data } });
  };

  resetTemplate = () => this.setState(ButtonCreator.defaultState);

  // TODO: Refactor this. At the moment it's being duplicated in most
  // components but we should extract it.
  build = (): string => {
    const { url, rates, lang, correctLowAsks, recurringDefault, weekly } = this.props;
    const template = this.state.template[this.props.lang];

    if (rates)
      return new ButtonBuilder({
        url,
        template,
        rates,
        locale: lang,
        correctLowAsks,
        omitAmount: false,
        style: this.props.styles.buttonStyle,
        recurringDefault: recurringDefault,
        weekly: weekly
      }).build();

    throw new Error('Rates not loaded');
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.currentTarget.value });
  };

  render() {
    return (
      <div className="ButtonCreator tool-section">
        <label className="label">Build a button</label>
        <InputWithActions
          value={this.state.template[this.props.lang]}
          onChange={this.onChange}
          onReset={this.resetTemplate}
          onSubmit={this.build}
        />
      </div>
    );
  }
}
