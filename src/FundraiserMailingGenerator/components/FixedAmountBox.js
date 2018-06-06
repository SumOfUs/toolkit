// @flow
import React, { Component } from 'react';
import { Field, Input, Control } from 'reactbulma';
import type { State as Props } from '../BaseComponent';
import type { RecurringDefault } from '../utils/builders/url';

type State = {
  recurringDefault: RecurringDefault,
};
export default class FixedAmountCreator extends Component<Props, State> {
  static defaultState = {
    amounts: [4, 8, 20, undefined, undefined],
    recurringDefault: 'default',
    linkTemplate: {
      en: `Yes, I'll donate {{amount}} now`,
      fr: `Oui, I'll donate {{amount}} now`,
      de: `Ja, I'll donate {{amount}} now`,
    },
    buttonTemplate: {
      en: `Donate {{amount}} now`,
      fr: `Donner {{amount}}`,
      de: `Jetzt {{amount}} Spenden`,
    },
    otherLinkTemplate: {
      en: `Donate another amount`,
      fr: `Doner un autre montant`,
      de: `Spenden Sie einen anderen Betrag`,
    },
  };
  render() {
    return (
      <div className="FixedAmountCreator tool-section">
        <Field>
          <label className="label">Link Text</label>
        </Field>
        <Field>
          <label className="label">Donate Another Amount Text</label>
        </Field>

        <label className="label">
          Enter your amounts here. 4 and 5 are optional. Each will create a
          button.
        </label>

        <Field className="is-grouped is-grouped-multiline">
          <Control>
            <Input
              small
              name="monthlyAmount1"
              value={1}
              className="is-info"
              placeholder="Amount 1"
              type="text"
            />
          </Control>
          <Control>
            <Input
              small
              name="monthlyAmount2"
              value={5}
              className="is-info"
              placeholder="Amount 2"
              type="text"
            />
          </Control>
          <Control>
            <Input
              small
              name="monthlyAmount3"
              value={10}
              className="is-info"
              placeholder="Amount 3"
              type="text"
            />
          </Control>
          <Control>
            <Input
              small
              name="monthlyAmount4"
              placeholder="Amount 4 (optional)"
              type="text"
            />
          </Control>
          <Control>
            <Input
              small
              name="monthlyAmount5"
              placeholder="Amount 5 (optional)"
              type="text"
            />
          </Control>
        </Field>
        <Field>
          <label className="label">Recurring default</label>
          <div className="select">
            <select name="recurringDefault" value={'default'}>
              <option value="default">Use Page Default</option>
              <option value="recurring">Recurring</option>
              <option value="only_recurring">Only Recurring</option>
              <option value="one_off">One off</option>
            </select>
          </div>
        </Field>
        <label className="label">Copy Content</label>
      </div>
    );
  }
}
