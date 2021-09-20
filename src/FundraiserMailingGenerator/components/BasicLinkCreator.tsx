import React, { Component, SyntheticEvent } from 'react';
import { isEqual, debounce } from 'lodash';
import LinkBuilder from '../utils/builders/link';
import InputWithActions from './InputWithActions';
import { hydrate, save } from '../state/localStorage';
import * as CSS from 'csstype';
import { Rates } from '../utils/exchange-rates';
import { RecurringDefault } from '../utils/builders/url';

type State = {
  template: { [lang: string]: string };
};

type Props = {
  lang: string;
  url: string;
  rates: Rates | null;
  correctLowAsks?: boolean;
  styles: { [key: string]: CSS.Properties };
  recurringDefault: RecurringDefault;
  weekly: boolean;
};

export default class LinkCreator extends Component<Props, State> {
  _debouncedSave: any;

  static defaultState = {
    template: {
      en: 'Yes, I will chip in {{amount}} to help ...',
      fr: 'Oui, je vais donner {{amount}} pour aider ...',
      de: 'Ja, ich spende {{amount}}, um zu helfen ...',
      nl: 'Ja, ich spende {{amount}}, um zu helfen ...',
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

  updateTemplate = (data: { [key: string]: string }) => {
    this.setState({ template: { ...this.state.template, ...data } });
  };

  resetTemplate = () => this.setState(LinkCreator.defaultState);

  build = (): string => {
    const { url, rates, lang, correctLowAsks, recurringDefault, weekly } = this.props;
    const template = this.state.template[this.props.lang];

    if (rates) {
      return new LinkBuilder({
        url,
        template,
        rates,
        locale: lang,
        correctLowAsks,
        omitAmount: false,
        style: this.props.styles.linkStyle,
        recurringDefault: recurringDefault,
        weekly: weekly
      }).build();
    }

    throw new Error('Rates not loaded');
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.currentTarget.value });
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
