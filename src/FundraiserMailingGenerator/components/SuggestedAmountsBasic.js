import React, { Component } from 'react';
import PlainTextCreator from './PlainTextCreator';
import BasicLinkCreator from './BasicLinkCreator';
import ButtonCreator from './ButtonCreator';
import type { State as Props } from '../BaseComponent';

type State = {};

export default class Basic extends Component<Props, State> {
  render() {
    return (
      <div className="BasicFundraiserCreators">
        <PlainTextCreator {...this.props} />
        <BasicLinkCreator {...this.props} />
        <ButtonCreator {...this.props} />
      </div>
    );
  }
}