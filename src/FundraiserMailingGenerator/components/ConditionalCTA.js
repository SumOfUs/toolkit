import React, { Component } from 'react';
import CopyButton from './CopyButton';
import DonorMarkupBuilder from './DonorMarkupBuilder';
import NonDonorMarkupBuilder from './NonDonorMarkupBuilder';
import * as utils from '../utils';
import locales from '../locales';

class BoxTextHTML extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donorButtonTemplate: locales[props.lang].donorButtonDefaults,
      donorOtherLinkTemplate: locales[props.lang].donorLinkDefaults,
      donorMultipliers: [1, 1.5, 2, 0, 0],
      donorRecurring: '',
      donorOneClick: true,
      donorWeekly: false,
      nonDonorButtonTemplate: locales[props.lang].donorButtonDefaults,
      nonDonorLinkTemplate: locales[props.lang].nonDonorLinkDefaults,
    };
  }

  updateKey = (key, value) => {
    this.setState({ [key]: value });
  };

  buildMarkup = (donorTemplate = 'XXXX', nonDonorTemplate = 'YYYY') => {
    // Note: We are doing snapshot testing. If we modify this template,
    //       we should also update the snapshot. Make sure the snapshot
    //       test is passing, before updating the snapshot, otherwise
    //       you'll have no guarantee that the output is what's expected.
    const tpl = `
    {% if donations_as_usd.highest_previous %}
    <!--- DONOR --->
    <p style="text-align: center; font-size: 15px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><em>${
      locales[this.props.lang].oneClickCopy
    }</em></p>
  
    ${donorTemplate}
  
    {% else %}
    <!--- NON-DONOR --->
    <p><em>${locales[this.props.lang].paymentMethodsCopy}</em></p>
  
    ${nonDonorTemplate}
  
    {% endif %}`;
    return tpl;
  };

  donorTemplate = () => {
    return utils.donorSuggestedAmountsMarkup({
      locale: this.props.lang,
      rates: this.props.rates,
      url: this.props.url,
      styles: this.props.styles,
      multipliers: this.state.donorMultipliers,
      recurringDefault: this.state.donorRecurring,
      oneClick: this.state.donorOneClick,
      weekly: this.state.donorWeekly,
      buttonTemplate: this.state.donorButtonTemplate,
      otherAmountTemplate: this.state.donorOtherLinkTemplate,
    });
  };

  nonDonorTemplate = (options = {}) => {
    return utils.nonDonorSuggestedAmountsMarkup({
      correctLowAsks: options.correctLowAsks || false,
      isButton: options.isButton || false,
      locale: this.props.lang,
      rates: this.props.rates,
      styles: this.props.styles,
      template: options.template || this.state.nonDonorButtonTemplate,
      url: this.props.url,
      recurringDefault: this.state.donorRecurring,
      weekly: this.state.donorWeekly,
    });
  };

  buildSidebarMarkup = () => {
    return this.buildMarkup(
      this.donorTemplate(),
      this.nonDonorTemplate({
        isButton: true,
        template: this.state.nonDonorButtonTemplate,
      })
    );
  };

  buildBodyMarkup = () => {
    return this.buildMarkup(
      this.donorTemplate(),
      this.nonDonorTemplate({
        isButton: false,
        template: this.state.nonDonorLinkTemplate,
      })
    );
  };

  render() {
    return (
      <div id="box-text-wrapper" className="tool-section">
        <div className="columns">
          <div className="column">
            <h1 className="subtitle">Donors</h1>
            <DonorMarkupBuilder
              donorButtonTemplate={this.state.donorButtonTemplate}
              donorOtherLinkTemplate={this.state.donorOtherLinkTemplate}
              donorMultipliers={this.state.donorMultipliers}
              donorRecurring={this.state.donorRecurring}
              donorOneClick={this.state.donorOneClick}
              donorWeekly={this.state.donorWeekly}
              onChange={this.updateKey}
            />
          </div>
          <div className="column">
            <h2 className="subtitle">Non-donors</h2>
            <NonDonorMarkupBuilder
              nonDonorButtonTemplate={this.state.nonDonorButtonTemplate}
              nonDonorLinkTemplate={this.state.nonDonorLinkTemplate}
              onChange={this.updateKey}
            />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <CopyButton textFn={this.buildSidebarMarkup}>
              <span data-testid="box-button">
                Copy <strong>box button</strong> html
              </span>
            </CopyButton>{' '}
            <CopyButton textFn={this.buildBodyMarkup}>
              <span data-testid="body-button">
                Copy <strong>body</strong> html
              </span>
            </CopyButton>
          </div>
        </div>
      </div>
    );
  }
}

export default BoxTextHTML;
