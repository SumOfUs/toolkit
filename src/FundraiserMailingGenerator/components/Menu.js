import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export default () => (
  <nav className="FundraiserMailingMenu breadcrumb is-centered">
    <ul>
      <li>
        <NavLink exact to="/fundraiser-mailing" activeClassName="is-active">
          Non Donor Email
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/fundraiser-mailing/donors"
          activeClassName="is-active"
        >
          Donor Email
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to="/fundraiser-mailing/recurring-donors"
          activeClassName="is-active"
        >
          Monthly Fundraiser
        </NavLink>
      </li>
    </ul>
  </nav>
);
