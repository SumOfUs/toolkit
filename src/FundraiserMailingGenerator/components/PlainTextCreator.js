// @flow
import React, { Component } from 'react';
import { Field, Input, Control, Button, Icon } from 'reactbulma';
import CopyButton from './CopyButton';
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
      en: 'Will you chip in {{amount}} to save the bees?',
      fr: 'Will you chip in {{amount}} to save the bees?',
      de: 'Will you chip in {{amount}} to save the bees?',
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

  saveState = debounce(() => save('PlainTextCreator', this.state), 3000);

  updateTemplate = (data: { [string]: string }) => {
    this.setState({ template: { ...this.state.template, ...data } });
  };

  resetTemplate = () => this.setState(PlainTextCreator.defaultState);

  build = (): string => {
    const { rates, lang } = this.props;
    const template = this.state.template[this.props.lang];
    if (rates) return buildPlainText(template, rates, lang);

    throw new Error('Rates not loaded');
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.updateTemplate({ [this.props.lang]: e.target.value });
  };

  render() {
    return (
      <div className="PlainTextBuilder">
        <label className="label">Plain Text Content</label>
        <Field hasAddons>
          <Control>
            <Button onClick={this.resetTemplate}>
              <Icon small>
                <i className="fas fa-sync" />
              </Icon>
            </Button>
          </Control>
          <Control style={{ width: '100%' }}>
            <Input
              type="text"
              onChange={this.onChange}
              value={this.state.template[this.props.lang]}
            />
          </Control>
          <Control>
            <CopyButton textFn={this.build} />
          </Control>
        </Field>
      </div>
    );
  }
}
