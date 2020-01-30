import React, { SyntheticEvent } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';

import CopyButton from './CopyButton';

type Props = {
  value: string;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => any;
  onReset: () => any;
  onSubmit: () => any;
};

export default function InputWithActions(props: Props) {
  return (
    <Form.Field kind="addons">
      <Form.Control>
        <Button onClick={props.onReset}>
          <Icon size="small">
            <i className="fas fa-sync" />
          </Icon>
        </Button>
      </Form.Control>
      <Form.Control style={{ width: '100%' }}>
        <Form.Input type="text" onChange={props.onChange} value={props.value} />
      </Form.Control>
      <Form.Control>
        <CopyButton textFn={props.onSubmit} />
      </Form.Control>
    </Form.Field>
  );
}
