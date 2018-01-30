import React from 'react';
import { Message, Button } from 'reactbulma'

const EmailPreview = (props) => {
  const body = props.body.split('\n').map((item, key) => {
    return <span key={key}>{item}<br/></span>
  });

  return (
    <Message>
      <Message.Header>
        <p><strong>To:</strong> {props.to}</p>
        <Button onClick={ props.handleDelete }
          className="delete is-medium"
          aria-label="delete"></Button>
      </Message.Header>
      <Message.Body>
        <p><strong>Subject:</strong> {props.subject}</p>
        <br/>
        <p>
          {body}
        </p>
      </Message.Body>
    </Message>
  );
};

export default EmailPreview;
