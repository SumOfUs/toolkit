import React from 'react';
import { Form, Button } from 'react-bulma-components';
import Textarea from 'react-bulma-components/lib/components/form/components/textarea';

const EmailForm = props => {
  return (
    <div>
      <Form.Field>
        <Form.Input
          name="to"
          onChange={props.handleChange}
          placeholder="To"
          value={props.to}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          name="subject"
          value={props.subject}
          onChange={props.handleChange}
          placeholder="Subject"
        />
      </Form.Field>
      <Form.Field>
        <Textarea
          name="body"
          onChange={props.handleChange}
          placeholder="Message"
          value={props.body}
        />
      </Form.Field>
      <Form.Field>
        <Button>Add</Button>
      </Form.Field>
    </div>
  );
};

export default EmailForm;
