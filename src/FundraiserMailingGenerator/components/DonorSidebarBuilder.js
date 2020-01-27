import React, { useState } from 'react';
import { Button, Control, Field, Icon, Input } from 'reactbulma';

const BUTTON_DEFAULTS = {
  en: `Donate {{amount}} now`,
  fr: `Donner {{amount}}`,
  de: `Jetzt {{amount}} Spenden`,
};
const GroupedInput = props => {
  return (
    <Field className="is-horizontal is-grouped">
      <div className="field-label">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body">
        <Input
          type="text"
          small
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </Field>
  );
};

const DonorSidebarBuilder = props => {
  // React hooks (useState hook)
  const [buttonTemplate, updateButtonTemplate] = useState(
    BUTTON_DEFAULTS[props.lang] || BUTTON_DEFAULTS.en
  );
  const [otherAmountTemplate, updateOtherAmountTemplate] = useState(
    BUTTON_DEFAULTS[props.lang] || BUTTON_DEFAULTS.en
  );
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
    </div>
  );
};

export default DonorSidebarBuilder;
