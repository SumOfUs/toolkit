import React from 'react';
import { GroupedInput } from './forms';

const NonDonorMarkupBuilder = props => {
  return (
    <div className="form">
      <GroupedInput
        label="Sidebar Button"
        value={props.nonDonorButtonTemplate}
        onChange={e => props.onChange('nonDonorButtonTemplate', e.target.value)}
      />
      <GroupedInput
        label="Body Link"
        value={props.nonDonorLinkTemplate}
        onChange={e => props.onChange('nonDonorLinkTemplate', e.target.value)}
      />
    </div>
  );
};

export default NonDonorMarkupBuilder;
