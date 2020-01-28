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
  const [buttonTemplate, updateButtonTemplate] = useState(
    BUTTON_DEFAULTS[props.lang] || BUTTON_DEFAULTS.en
  );
  const [otherAmountTemplate, updateOtherAmountTemplate] = useState(
    LINK_DEFAULTS[props.lang] || LINK_DEFAULTS.en
  );

  const [multipliers, setMultipliers] = useState([1, 1.5, 2, 0, 0]);
  const [recurring, setRecurring] = useState('');
  const [oneClick, setOneClick] = useState(true);

  const updateMultipliers = (value, index) => {
    const result = [...multipliers];
    if (Number.isNaN(Number(value))) return;
    result[index] = Number(value);
    setMultipliers(result);
  };

  return (
    <div className="form">
      <GroupedInput
        label="Button"
        value={buttonTemplate}
        onChange={e => updateButtonTemplate(e.target.value)}
      />
      <GroupedInput
        label="Another Amount"
        value={otherAmountTemplate}
        onChange={e => updateOtherAmountTemplate(e.target.value)}
      />

      <GroupedWithChildren label="Multipliers">
        {multipliers.map((amount, index) => (
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
            value={recurring}
            onChange={e => setRecurring(e.target.value)}
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
            'is-success': oneClick,
            'is-danger': !oneClick,
          })}
        >
          <select
            className="is-small"
            name="oneClick"
            value={oneClick}
            onChange={e => setOneClick(e.target.value === 'true')}
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
