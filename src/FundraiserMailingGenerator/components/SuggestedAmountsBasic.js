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
        <PlainTextCreator {...this.props} correctLowAsks={false} />
        <BasicLinkCreator {...this.props} correctLowAsks={false} />
        <ButtonCreator {...this.props} correctLowAsks={false} />
      </div>
    );
  }
}
