import React, { Component, SyntheticEvent } from 'react';
import PlainTextCreator from './PlainTextCreator';
import BasicLinkCreator from './BasicLinkCreator';
import ButtonCreator from './ButtonCreator';
import CannotDonateButtonCreator from './CannotDonateButtonCreator';
import * as CSS from 'csstype';
import { Rates } from '../utils/exchange-rates';
import Toggle from 'react-toggle';
import { isUndefined } from 'lodash';
import { RecurringDefault } from '../utils/builders/url';

type State = {
  recurringDefault: RecurringDefault | undefined;
};

type Props = {
  url: string;
  rates: Rates | null;
  lang: string;
  styles: { [key: string]: CSS.Properties };
};

export default class Basic extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { recurringDefault: '' };
  }

  handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value as RecurringDefault;
    this.setState({recurringDefault: value });
  };

  render() {
    return (
      <div className="BasicFundraiserCreators">
        <PlainTextCreator {...this.props} correctLowAsks={false} />
        <BasicLinkCreator {...this.props} correctLowAsks={false} recurringDefault={this.state.recurringDefault} />
        <ButtonCreator {...this.props} correctLowAsks={false} recurringDefault={this.state.recurringDefault} />
        <CannotDonateButtonCreator {...this.props} correctLowAsks={false} />

        <div className=" tool-section">
          <label htmlFor="oneoff-only-donation">Donation Type &nbsp;</label>
          <span className="select is-small">
            <select name="recurringDefault" className='is-small' onChange={this.handleChange }>
              <option value="">Default</option>
              <option value="only_one_off">Only One-off Donation </option>
              <option value="only_recurring">Only Recurring Donation</option>
            </select>
          </span>
        </div>
      </div>
    );
  }
}
