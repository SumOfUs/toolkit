import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Field, Level, Button, Tag } from 'reactbulma'

const CopyContent = props => (
  <CopyToClipboard text={props.dataAsJSON()} onCopy={props.handleOnCopy}>
    <Field>
      <Level>
      <Level.Left>
        <Level.Item>
          <Button>Copy to clipboard</Button>
        </Level.Item>
        <Level.Item>
          {props.copied ? <Tag className='is-success'>Copied.</Tag> : ''}
        </Level.Item>
        </Level.Left>
      </Level>
    </Field>
  </CopyToClipboard>
);

export default CopyContent;
