import React from 'react';
import { Form } from 'react-bulma-components';

export const GroupedWithChildren = props => {
  return (
    <Form.Field className="is-horizontal is-grouped">
      <div className="field-label">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body">{props.children}</div>
    </Form.Field>
  );
};

export default GroupedWithChildren;
