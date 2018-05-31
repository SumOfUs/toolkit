import React from 'react';
import {Field, Input, Control } from 'reactbulma';
import clipboard from 'clipboard';
import CopyButton from './CopyButton'
import BuildTemplate from './FundraiserMailingBuilder';

export default (props) => {
  return (
    <div className='buttons'>
      <button onClick={ () => {
            console.log(BuildTemplate(props.state));
        }}
        className='button'>Click</button>

      <CopyButton text={BuildTemplate(props.state)}>Copy HTML</CopyButton>

    </div>
  )
};
