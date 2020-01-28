import { Input, Field } from 'reactbulma';
import React from 'react';

export const GroupedInput = props => {
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

export default GroupedInput;
