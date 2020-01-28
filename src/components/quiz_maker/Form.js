import React from 'react';
import { Field, Input } from 'react-bulma-components';

const Form = props => {
  return (
    <div>
      <Form.Field>
        <Form.Input
          className="is-medium"
          name="question"
          value={props.question}
          onChange={props.handleChange}
          placeholder="Type in your question and press enter..."
        />
      </Form.Field>
    </div>
  );
};

export default Form;
