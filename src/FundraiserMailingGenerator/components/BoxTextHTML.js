import React, { Component, useState } from 'react';
import { Button, Icon } from 'reactbulma';
import CopyButton from './CopyButton';
import DonorMarkupBuilder from './DonorMarkupBuilder';
import NonDonorMarkupBuilder from './NonDonorMarkupBuilder';
import utils from '../utils';

// FIXME: Move to translation file?
const DONOR_BUTTON_DEFAULTS = {
  en: `Donate {{amount}} now`,
  fr: `Donner {{amount}}`,
  de: `Jetzt {{amount}} Spenden`,
};

const DONOR_LINK_DEFAULTS = {
  en: `Donate another amount`,
  fr: `Doner un autre montant`,
  de: `Spenden Sie einen anderen Betrag`,
};
const NON_DONOR_LINK_DEFAULTS = {
  en: `Will you chip in {{amount}} to help [EDIT]?`,
  fr: `Oui, je vais donner {{amount}} pour aider [EDIT]`,
  de: `Ja, ich spende {{amount}}, um zu helfen [EDIT]`,
};

class BoxTextHTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donorButtonTemplate: DONOR_BUTTON_DEFAULTS[props.lang],
      donorOtherLinkTemplate: DONOR_LINK_DEFAULTS[props.lang],
      donorMultipliers: [1, 1.5, 2, 0, 0],
      donorRecurring: '',
      donorOneClick: true,
      nonDonorButtonTemplate: DONOR_BUTTON_DEFAULTS[props.lang],
      nonDonorLinkTemplate: NON_DONOR_LINK_DEFAULTS[props.lang],
    };
  }

  updateKey = (key, value) => {
    this.setState({ [key]: value });
  };

  buildMarkup = (donorTemplate = 'XXXX', nonDonorTemplate = 'YYYY') => {
    const tpl = `
  {% if donations_as_usd.highest_previous %}
  <!--- DONOR --->
  <p><strong><em>If you’ve saved your payment information with SumOfUs, your donation will go through immediately:</em></strong></p>
  ${donorTemplate}
  {% else %}
  <!--- NON-DONOR --->
  <p><em>Donating just takes a moment -- use Paypal or your card.</em></p>
  ${nonDonorTemplate}
  {% endif %}`;
    return tpl;
  };

  buildSidebarMarkup() {
    const donorTemplate = utils.donorSuggestedAmountsMarkup({
      locale: this.props.lang,
      rates: this.props.rates,
      url: this.props.url,
      styles: this.props.styles,
      multipliers: this.state.donorMultipliers,
      recurringDefault: this.state.donorRecurring,
      oneClick: this.state.donorOneClick,
      buttonTemplate: this.state.donorButtonTemplate,
      otherAmountTemplate: this.state.donorOtherLinkTemplate,
    });
    return buildMarkup(donorTemplate, nonDonorTemplate /*button*/);
  }

  buildBodyMarkup() {
    // return buildMarkup(donorTemplate, nonDonorTemplate /*link*/);
  }

  render() {
    return (
      <div id="box-text-wrapper" className="tool-section">
        <div className="columns">
          <div className="column">
            <center>Donors</center>
            <DonorMarkupBuilder
              donorButtonTemplate={this.state.donorButtonTemplate}
              donorOtherLinkTemplate={this.state.donorOtherLinkTemplate}
              donorMultipliers={this.state.donorMultipliers}
              donorRecurring={this.state.donorRecurring}
              donorOneClick={this.state.donorOneClick}
              onChange={this.updateKey}
            />
          </div>
          <div className="column">
            <h2>Non-donors</h2>
            <NonDonorMarkupBuilder
              nonDonorButtonTemplate={this.state.donorButtonTemplate}
              nonDonorLinkTemplate={this.state.nonDonorLinkTemplate}
              onChange={this.updateKey}
            />
          </div>
        </div>

        <div className="level">
          <CopyButton textFn={this.buildSidebarMarkup} />
          <Button onClick={this.buildMarkup}>
            <Icon small>
              <i className="fas fa-sync" />
            </Icon>
            <span>Reset</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default BoxTextHTML;
