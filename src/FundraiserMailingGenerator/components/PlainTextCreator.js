// @flow
import React, { Component } from 'react';
import InputWithActions from './InputWithActions';
import { debounce, isEqual } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import TextBuilder from '../utils/builders/text';

import type { State as BaseState } from '../BaseComponent';

type State = {
  template: { [lang: string]: string },
  recurring: string,
};

type Props = BaseState & { correctLowAsks?: boolean };

export default class PlainTextCreator extends Component<Props, State> {
  _debouncedSave: any;

  static defaultState = {
    template: {
      en: 'Will you chip in {{amount}} to help ...?',
      fr: 'Ferez-vous un don de {{amount}} pour aider ...?',
      de: 'Wirst du {{amount}} spenden um zu helfen ...?',
      es: '¿Puedes aportar {{amount}} para ayudar a ...?',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = hydrate('PlainTextCreator', PlainTextCreator.defaultState);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (!isEqual(this.state, nextState)) return true;
    return this.props.lang !== nextProps.lang;
  }

  componentDidUpdate() {
    this._debouncedSave = this.saveState();
  }

  componentWillUnmount() {
    if (this._debouncedSave) this._debouncedSave.flush();
  }

  saveState = debounce(() => save('PlainTextCreator', this.state), 1500);

  updateTemplate = (data: { [string]: string }) => {
    this.setState({ template: { ...this.state.template, ...data } });
  };

  resetTemplate = () => this.setState(PlainTextCreator.defaultState);

  build = (): string => {
    if (this.props.rates)
      return new TextBuilder({
        template: this.state.template[this.props.lang],
        locale: this.props.lang,
        rates: this.props.rates,
        correctLowAsks: this.props.correctLowAsks,
      }).build();

    throw new Error('Rates not loaded');
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.target.value });
  };

  render() {
    return (
      <div className="PlainTextBuilder tool-section">
        <label className="label">Build plain text</label>
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
