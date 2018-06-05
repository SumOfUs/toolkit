// @flow
import React, { Component } from 'react';
import InputWithActions from './InputWithActions';
import { debounce, isEqual } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import { buildPlainText } from '../utils';

import type { State as Props } from '../BaseComponent';

type State = {
  template: { [lang: string]: string },
  recurring: string,
};

export default class PlainTextCreator extends Component<Props, State> {
  _debouncedSave: any;

  static defaultState = {
    template: {
      en: 'Will you chip in {{amount}} to help ...?',
      fr: 'Ferez-vous un don de {{amount}} pour aider ...?',
      de: 'Wirst du {{amount}} spenden um zu helfen ...?',
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
    const { rates, lang } = this.props;
    const template = this.state.template[this.props.lang];
    if (rates) return buildPlainText({ template, rates, lang });

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
