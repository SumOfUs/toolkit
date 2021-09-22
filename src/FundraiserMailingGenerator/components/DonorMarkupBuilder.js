import React from 'react';
import { Form } from 'react-bulma-components';
import { GroupedWithChildren, GroupedInput } from './forms';
import classnames from 'classnames';

// FIXME: Move to translation file?
const BUTTON_DEFAULTS = {
  en: `Donate {{amount}} now`,
  nl: 'Doneer nu {{amount}}',
  fr: `Donner {{amount}}`,
  de: `Jetzt {{amount}} Spenden`,
};

const LINK_DEFAULTS = {
  en: `Donate another amount`,
  nl: `Doneer een ander bedrag`,
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
    <>
      <GroupedInput
        label="Button"
        value={props.donorButtonTemplate}
        onChange={e =>
          props.onChange('donorButtonTemplate', e.currentTarget.value)
        }
      />
      <GroupedInput
        label="Other"
        value={props.donorOtherLinkTemplate}
        onChange={e =>
          props.onChange('donorOtherLinkTemplate', e.currentTarget.value)
        }
      />

      <GroupedWithChildren label="Multipliers">
        {props.donorMultipliers.map((amount, index) => (
          <Form.Control key={`amount-${index}`} className="field">
            <Form.Input
              size="small"
              name={`amount-${index}`}
              value={amount || ''}
              className="is-info"
              placeholder={`Amount ${index + 1}`}
              type="text"
              onChange={e => updateMultipliers(e.currentTarget.value, index)}
            />
          </Form.Control>
        ))}
      </GroupedWithChildren>

      <GroupedWithChildren label="Recurring">
        <div className="select is-small">
          <select
            className="is-small"
            name="recurringDefault"
            value={props.donorRecurring}
            onChange={e =>
              props.onChange('donorRecurring', e.currentTarget.value)
            }
          >
            <option value="">Use page default</option>
            <option value="recurring">Recurring</option>
            <option value="only_recurring">Only recurring</option>
            <option value="one_off">One off</option>
            <option value="only_one_off">Only One off</option>
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
              props.onChange('donorOneClick', e.currentTarget.value === 'true')
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </GroupedWithChildren>
      <GroupedWithChildren label="Allow Weekly">
        <div
          className={classnames('select', 'is-small', {
            'is-success': props.donorOneClick,
            'is-danger': !props.donorOneClick,
          })}
        >
          <select
            className="is-small"
            name="weekly"
            value={props.donorWeekly}
            onChange={e =>
              props.onChange('donorWeekly', e.currentTarget.value === 'true')
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </GroupedWithChildren>
    </>
  );
};

export default DonorSidebarBuilder;
