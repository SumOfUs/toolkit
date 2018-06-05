// @flow
import React, { Component } from 'react';
import { hydrate, save } from '../state/localStorage';

type Props = {
  url: string,
  enableRecurring?: boolean,
};
type State = {
  template: string,
  recurring: string,
};

export default class BasicLinkCreator extends Component<Props, State> {
  _interval: any;

  static defaultState = {
    template: {
      en: 'Will you chip in {{amount}} to save the bees?',
      fr: 'Will you chip in {{amount}} to save the bees?',
      de: 'Will you chip in {{amount}} to save the bees?',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = hydrate('BasicLinkCreator', BasicLinkCreator.defaultState);
  }

  componentDidMount() {
    this._interval = setInterval(
      () => save('BasicLinkCreator', this.state),
      5000
    );
  }

  componentWillUnmount() {
    if (this._interval) clearInterval(this._interval);
  }

  render() {
    return <div className="BasicLinkCreator creator-wrapper">hEllo</div>;
  }
}
