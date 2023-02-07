// @flow
import React, { Component } from 'react';
import InputWithActions from './InputWithActions';
import { renderToStaticMarkup } from 'react-dom/server';
import { Style } from '../utils/styles';
import { debounce, isEqual } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import ButtonBuilder from '../utils/builders/button';

import type { State as BaseState } from '../BaseComponent';

type State = {
  template: { [lang: string]: string },
  recurring: string,
  buttonStyle: any,
};

type Props = BaseState & {
  correctLowAsks?: boolean,
};

let URL =
  'https://www.eko.org/optout/?lang={{ user.lang }}&akid={{ user.token }}';

let buttonStyle = {
  backgroundColor: '#BEBEBE',
  color: '#000',
};

export default class CannotDonateButtonCreator extends Component<Props, State> {
  _debouncedSave: any;

  static defaultState = {
    template: {
      en: "Can't Donate",
      fr: 'Je ne peux pas faire de don',
      de: 'Kann nicht spenden',
      es: 'No puedo donar',
      pt: 'Não posso doar',
      nl: "Can't Donate",
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = hydrate(
      'CannotDonateButtonCreator',
      CannotDonateButtonCreator.defaultState
    );
    this.state.buttonStyle = props.styles.buttonStyle;
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

  saveState = debounce(
    () => save('CannotDonateButtonCreator', this.state),
    1500
  );

  updateTemplate = (data: { [string]: string }) => {
    this.setState({ template: { ...this.state.template, ...data } });
  };

  resetTemplate = () => this.setState(CannotDonateButtonCreator.defaultState);

  // TODO: Refactor this. At the moment it's being duplicated in most
  // components but we should extract it.
  build = (): string => {
    return renderToStaticMarkup(
      <a style={{ ...this.state.buttonStyle, ...buttonStyle }} href={URL}>
        {this.state.template[this.props.lang]}
      </a>
    );
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.target.value });
  };

  render() {
    return (
      <div className="CannotDonateButtonCreator tool-section">
        <label className="label">Can't Donate</label>
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
