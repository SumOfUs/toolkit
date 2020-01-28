import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Form, Level, Button, Tag } from 'react-bulma-components';

const CopyContent = props => (
  <CopyToClipboard text={props.dataAsJSON()} onCopy={props.handleOnCopy}>
    <Form.Field>
      <Level>
        <Level.Left>
          <Level.Item>
            <Button>Copy to clipboard</Button>
          </Level.Item>
          <Level.Item>
            {props.copied ? <Tag className="is-success">Copied.</Tag> : ''}
          </Level.Item>
        </Level.Left>
      </Level>
    </Form.Field>
  </CopyToClipboard>
);

export default CopyContent;
