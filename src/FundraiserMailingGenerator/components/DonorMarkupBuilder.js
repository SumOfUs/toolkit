import React, { useState } from 'react';
import { Control, Input } from 'reactbulma';
import { GroupedWithChildren, GroupedInput } from './forms';
import classnames from 'classnames';

// FIXME: Move to translation file?
const BUTTON_DEFAULTS = {
  en: `Donate {{amount}} now`,
  fr: `Donner {{amount}}`,
  de: `Jetzt {{amount}} Spenden`,
};

const LINK_DEFAULTS = {
  en: `Donate another amount`,
  fr: `Doner un autre montant`,
  de: `Spenden Sie einen anderen Betrag`,
};

const DonorSidebarBuilder = props => {
  const updateMultipliers = (value, index) => {
    const result = [...props.donorMultipliers];
    if (Number.isNaN(Number(value))) return;
    result[index] = Number(value);
    props.onChange('donorMultipliers', result);
  };

  return (
    <div className="form">
      <GroupedInput
        label="Button"
        value={props.donorButtonTemplate}
        onChange={e => props.onChange('donorButtonTemplate', e.target.value)}
      />
      <GroupedInput
        label="Another Amount"
        value={props.donorOtherLinkTemplate}
        onChange={e => props.onChange('donorOtherLinkTemplate', e.target.value)}
      />

      <GroupedWithChildren label="Multipliers">
        {props.donorMultipliers.map((amount, index) => (
          <Control key={`amount-${index}`} className="field">
            <Input
              small
              name={`amount-${index}`}
              value={amount || ''}
              className="is-info"
              placeholder={`Amount ${index + 1}`}
              type="text"
              onChange={e => updateMultipliers(e.target.value, index)}
            />
          </Control>
        ))}
      </GroupedWithChildren>

      <GroupedWithChildren label="Recurring">
        <div className="select is-small">
          <select
            className="is-small"
            name="recurringDefault"
            value={props.donorRecurring}
            onChange={e => props.onChange('donorRecurring', e.target.value)}
          >
            <option value="">Use page default</option>
            <option value="recurring">Recurring</option>
            <option value="only_recurring">Only recurring</option>
            <option value="one_off">One off</option>
          </select>
        </div>
      </GroupedWithChildren>
      <GroupedWithChildren label="One click">
        <div
          className={classnames('select', 'is-small', {
            'is-success': props.donorOneClick,
            'is-danger': !props.donorOneClick,
          })}
        >
          <select
            className="is-small"
            name="oneClick"
            value={props.donorOneClick}
            onChange={e =>
              props.onChange('donorOneClick', e.target.value === 'true')
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </GroupedWithChildren>
    </div>
  );
};

export default DonorSidebarBuilder;
