import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs } from 'react-bulma-components';
import './Menu.css';

export default () => (
  <Tabs centered className="FundraiserMailingMenu">
    <ul>
      <li>
        <NavLink exact to="/fundraiser-mailing" activeClassName="is-active">
          Suggested Amounts
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/fundraiser-mailing/suggested-amounts-donors"
          activeClassName="is-active"
        >
          Suggested Amounts (Donors)
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/fundraiser-mailing/fixed-amount"
          activeClassName="is-active"
        >
          Fixed Amounts (Monthly)
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/fundraiser-mailing/conditional-cta"
          activeClassName="is-active"
        >
          <span>Conditional CTA for full list</span>
        </NavLink>
      </li>
    </ul>
  </Tabs>
);
