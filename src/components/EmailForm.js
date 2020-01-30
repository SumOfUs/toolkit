import React from 'react';
import { Form, Button, Textarea } from 'react-bulma-components';

const EmailForm = props => {
  return (
    <div>
      <Form.Field>
        <Form.Input name="to" onChange={props.handleChange} placeholder="To" />
      </Form.Field>
      <Form.Field>
        <Form.Input
          name="subject"
          onChange={props.handleChange}
          placeholder="Subject"
        />
      </Form.Field>
      <Form.Field>
        <Textarea
          name="body"
          onChange={props.handleChange}
          placeholder="Message"
        />
      </Form.Field>
      <Form.Field>
        <Button>Add</Button>
      </Form.Field>
    </div>
  );
};

export default EmailForm;
