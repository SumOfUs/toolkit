// @flow
import React from 'react';
import { Field, Input, Control, Button, Icon } from 'reactbulma';
import CopyButton from './CopyButton';

type Props = {
  value: string,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => any,
  onReset: () => any,
  onSubmit: () => any,
};

export default function InputWithActions(props: Props) {
  return (
    <Field hasAddons>
      <Control>
        <Button onClick={props.onReset}>
          <Icon small>
            <i className="fas fa-sync" />
          </Icon>
        </Button>
      </Control>
      <Control style={{ width: '100%' }}>
        <Input type="text" onChange={props.onChange} value={props.value} />
      </Control>
      <Control>
        <CopyButton textFn={props.onSubmit} />
      </Control>
    </Field>
  );
}
