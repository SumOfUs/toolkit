import React from 'react';
import { Form } from 'react-bulma-components';

export const GroupedInput = props => {
  return (
    <Form.Field className="is-horizontal">
      <div className="field-label">
        <label className="label is-normal">{props.label}</label>
      </div>
      <div className="field-body">
        <Form.Input
          type="text"
          size="small"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </Form.Field>
  );
};

export default GroupedInput;
