import React from 'react';

export default (props) => (
  <nav className="breadcrumb is-centered is-large">
    <ul>
      <li className={props.section === 'nonDonor' ? 'is-active' : ''}>
        <a href="#" onClick={(e) => e.preventDefault() || props.switchTo('nonDonor')} >Non Donor Email</a>
      </li>
      <li className={props.section === 'donor' ? 'is-active' : ''}>
        <a href="#" onClick={(e) => e.preventDefault() || props.switchTo('donor')} >Donor Email</a>
      </li>
      <li className={props.section === 'monthly' ? 'is-active' : ''}>
        <a href="#" onClick={(e) => e.preventDefault() || props.switchTo('monthly')}>Monthly Fundraiser</a>
      </li>
    </ul>
  </nav>
);
