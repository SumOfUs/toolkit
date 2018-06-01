import React from 'react';
import { Field, Input, Control } from 'reactbulma';
import MonthlyFundraiserButtons from './MonthlyFundraiserButtons';

export default props => {
  const handleChange = props.handleChange;

  return (
    <div>
      <Field>
        <label className="label">Page URL</label>
        <Input
          type="text"
          name="pageUrl"
          onChange={handleChange}
          value={props.pageUrl}
        />
      </Field>
      <Field>
        <label className="label">Link Text</label>
        <Input
          type="text"
          name="linkText"
          onChange={handleChange}
          value={props.linkText}
        />
      </Field>
      <Field>
        <label className="label">Donate Another Amount Text</label>
        <Input
          type="text"
          name="donateAnotherAmountText"
          onChange={handleChange}
          value={props.donateAnotherAmountText}
        />
      </Field>

      <label className="label">
        Enter your amounts here. 4 and 5 are optional. Each will create a
        button.
      </label>

      <Field className="is-grouped is-grouped-multiline">
        <Control>
          <Input
            name="monthlyAmount1"
            value={props.monthlyAmount1}
            onChange={handleChange}
            className="is-info"
            placeholder="Amount 1"
            type="text"
          />
        </Control>
        <Control>
          <Input
            name="monthlyAmount2"
            value={props.monthlyAmount2}
            onChange={handleChange}
            className="is-info"
            placeholder="Amount 2"
            type="text"
          />
        </Control>
        <Control>
          <Input
            name="monthlyAmount3"
            value={props.monthlyAmount3}
            onChange={handleChange}
            className="is-info"
            placeholder="Amount 3"
            type="text"
          />
        </Control>
        <Control>
          <Input
            name="monthlyAmount4"
            value={props.monthlyAmount4}
            onChange={handleChange}
            placeholder="Amount 4 (optional)"
            type="text"
          />
        </Control>
        <Control>
          <Input
            name="monthlyAmount5"
            value={props.monthlyAmount5}
            onChange={handleChange}
            placeholder="Amount 5 (optional)"
            type="text"
          />
        </Control>
      </Field>
      <Field>
        <label className="label">Recurring default</label>
        <div className="select">
          <select
            name="recurringDefault"
            onChange={handleChange}
            value={props.recurringDefault}
          >
            <option value="default">Use Page Default</option>
            <option value="recurring">Recurring</option>
            <option value="only_recurring">Only Recurring</option>
            <option value="one_off">One off</option>
          </select>
        </div>
      </Field>
      <label className="label">Copy Content</label>
      <MonthlyFundraiserButtons state={props} />
    </div>
  );
};
