import React, { useState } from 'react';
import { Button, Icon } from 'reactbulma';
import CopyButton from './CopyButton'
import DonorSidebarBuilder from './DonorSidebarBuilder'

function BoxTextHTML(props) {
  const fn = (donorTemplate = 'XXXX', nonDonorTemplate = 'YYYY') => {
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

  return (
    <div id="box-text-wrapper" className="tool-section">
      <div className="columns">
        <div className="column">
          Donors
          <DonorSidebarBuilder lang={props.lang} />
        </div>
        <div className="column">
          Non donors
        </div>
      </div>

      <div className="level">
          <CopyButton textFn={fn} />
          <Button onClick={fn}>
            <Icon small>
              <i className="fas fa-sync" />
            </Icon>
            <span>Reset</span>
          </Button>
        </div>
    </div>
  );
}

export default BoxTextHTML;
