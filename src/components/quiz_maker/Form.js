import React from 'react';
import { Field, Input, } from 'reactbulma'

const Form = (props) => {
  return(
    <div>
      <Field>
        <Input className='is-medium' name='question' value={props.question} onChange={props.handleChange} placeholder='Type in your question and press enter...' />
      </Field>
    </div>
  )
}

export default Form;
