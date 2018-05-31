import React from 'react';
import CopyButton from './CopyButton'
import {BuildTemplate} from './NonDonorEmailBuilder';

const NonDonorEmailButtons = (props) => {
  console.log(props);
  return (
    <div className='buttons'>
      <CopyButton text={BuildTemplate(props.state, 'buttonTemplate')}>Copy Button Text</CopyButton>
      <CopyButton text={BuildTemplate(props.state, 'linkTemplate')}>Copy Link Text</CopyButton>
      <CopyButton text={BuildTemplate(props.state, 'textTemplate')}>Copy Plain Text</CopyButton>
    </div>
  )
};

export default NonDonorEmailButtons;
