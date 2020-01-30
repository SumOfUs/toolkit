import React from 'react';
import { GroupedInput } from './forms';

const NonDonorMarkupBuilder = props => {
  return (
    <div className="form">
      <GroupedInput
        label="Button"
        value={props.nonDonorButtonTemplate}
        onChange={e =>
          props.onChange('nonDonorButtonTemplate', e.currentTarget.value)
        }
      />
      <GroupedInput
        label="Link"
        value={props.nonDonorLinkTemplate}
        onChange={e =>
          props.onChange('nonDonorLinkTemplate', e.currentTarget.value)
        }
      />
    </div>
  );
};

export default NonDonorMarkupBuilder;
