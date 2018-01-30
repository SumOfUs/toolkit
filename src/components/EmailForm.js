import React from 'react';
import { Field, Input, Button, Textarea } from 'reactbulma'

const EmailForm = (props) => {
  return(
    <div>
      <Field>
        <Input name='to' onChange={props.handleChange} placeholder='To' />
      </Field>
      <Field>
        <Input name='subject' onChange={props.handleChange} placeholder='Subject' />
      </Field>
      <Field>
        <Textarea name='body' onChange={props.handleChange} placeholder='Message' />
      </Field>
      <Field>
        <Button>Add</Button>
      </Field>
    </div>
  )
}

export default EmailForm;
