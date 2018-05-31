import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Button = ({text, children}) => (
  <CopyToClipboard text={text}>
    <button className='button'>{children}</button>
  </CopyToClipboard>
);

export default Button;
