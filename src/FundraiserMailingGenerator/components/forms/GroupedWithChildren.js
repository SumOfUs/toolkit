import React from 'react';
import { Field } from 'reactbulma';

export const GroupedWithChildren = props => {
  return (
    <Field className="is-horizontal is-grouped">
      <div className="field-label">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body">{props.children}</div>
    </Field>
  );
};

export default GroupedWithChildren;
