import React, { Component, SyntheticEvent } from 'react';
import InputWithActions from './InputWithActions';
import { renderToStaticMarkup } from 'react-dom/server';
import { debounce, isEqual } from 'lodash';
import { hydrate, save } from '../state/localStorage';
import { Rates } from '../utils/exchange-rates';
import * as CSS from 'csstype';

type State = {
  template: { [lang: string]: string };
  recurring: string;
  buttonStyle: CSS.Properties;
};

type Props = {
  correctLowAsks?: boolean;
  url: string;
  rates: Rates | null;
  lang: string;
  styles: { [key: string]: CSS.Properties };
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
      fr: "Can't Donate",
      de: "Can't Donate",
      nl: "Can't Donate",
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = hydrate('CannotDonateButtonCreator', {
      ...CannotDonateButtonCreator.defaultState,
      buttonStyle: props.styles.buttonStyle,
    });
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

  updateTemplate = (data: { [key: string]: string }) => {
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

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.currentTarget.value });
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
