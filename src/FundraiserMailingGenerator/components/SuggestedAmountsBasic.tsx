import React, { Component } from 'react';
import PlainTextCreator from './PlainTextCreator';
import BasicLinkCreator from './BasicLinkCreator';
import ButtonCreator from './ButtonCreator';
import CannotDonateButtonCreator from './CannotDonateButtonCreator';
import * as CSS from 'csstype';
import { Rates } from '../utils/exchange-rates';

type State = {};
type Props = {
  url: string;
  rates: Rates | null;
  lang: string;
  styles: { [key: string]: CSS.Properties };
};
export default class Basic extends Component<Props, State> {
  render() {
    return (
      <div className="BasicFundraiserCreators">
        <PlainTextCreator {...this.props} correctLowAsks={false} />
        <BasicLinkCreator {...this.props} correctLowAsks={false} />
        <ButtonCreator {...this.props} correctLowAsks={false} />
        <CannotDonateButtonCreator {...this.props} correctLowAsks={false} />
      </div>
    );
  }
}
