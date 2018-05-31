import React from 'react';
import {Field, Input, Control } from 'reactbulma'
import NonDonorEmailButtons from './NonDonorEmailButtons';

export default (props) => {
  const handleChange = props.handleChange;

  return(
    <div>
      <Field>
        <label className="label">Page URL</label>
        <Input className='is-large' type='text' name='pageUrl' onChange={ handleChange } value={props.pageUrl} />
      </Field>
      <Field>
        <label className="label">Plain Text Content</label>
        <Input className='is-large' type='text' name='plainText' onChange={ handleChange } value={props.plainText} />
      </Field>
      <Field>
        <label className="label">Link Text Content</label>
        <Input className='is-large' type='text' name='linkText' onChange={ handleChange } value={props.linkText} />
      </Field>
      <label className="label">Copy Content</label>
      <NonDonorEmailButtons state={props} />
    </div>
  );
}
