// @flow
import React, { Component } from 'react';
import { isEqual, debounce } from 'lodash';
import LinkBuilder from '../utils/builders/link';
import InputWithActions from './InputWithActions';
import { hydrate, save } from '../state/localStorage';
import type { State as BaseState } from '../BaseComponent';

type State = {
  template: { [lang: string]: string },
};

type Props = BaseState & { correctLowAsks?: boolean };

export default class LinkCreator extends Component<Props, State> {
  _debouncedSave: any;

  static defaultState = {
    template: {
      en: 'Yes, I will chip in {{amount}} to help ...',
      fr: 'Oui, je vais donner {{amount}} pour aider ...',
      de: 'Ja, ich spende {{amount}}, um zu helfen ...',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = hydrate('LinkCreator', LinkCreator.defaultState);
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

  saveState = debounce(() => save('LinkCreator', this.state), 1500);

  updateTemplate = (data: { [string]: string }) => {
    this.setState({ template: { ...this.state.template, ...data } });
  };

  resetTemplate = () => this.setState(LinkCreator.defaultState);

  build = (): string => {
    const { url, rates, lang, correctLowAsks } = this.props;
    const template = this.state.template[this.props.lang];
    if (rates)
      return new LinkBuilder({
        url,
        template,
        rates,
        locale: lang,
        correctLowAsks,
      }).build();

    throw new Error('Rates not loaded');
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.target.value });
  };

  render() {
    return (
      <div className="LinkCreator tool-section">
        <label className="label">Build a link</label>
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
