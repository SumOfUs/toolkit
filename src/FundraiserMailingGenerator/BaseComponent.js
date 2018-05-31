import React, { Component } from 'react';
import axios from 'axios';
import Menu from './Menu';
import NonDonorEmailForm from './NonDonorEmailForm';
import MonthlyFundraiserForm from './MonthlyFundraiserForm';
import { compact } from 'lodash';

class Generator extends Component {
  constructor(props) {
    super(props)

    const state = {
      pageUrl: 'https://foobar.com',
      plainText: "Can you chip in $ to keep nestle's hands off our water",
      linkText: "Can you chip in $ to keep nestle's hands off our water",
      rates: {},
      lang: 'en',
      section: 'monthly',
      donateAnotherAmountText: 'Donate another amount',
      monthlyAmount1: 1,
      monthlyAmount2: 5,
      monthlyAmount3: 10,
      monthlyAmount4: '',
      monthlyAmount5: '',
      recurringDefault: '',
      amounts: []
    }

    this.state = {
      // buttonCompiled: BuildTemplate(state, buttonTemplate),
      // plainCompiled: BuildTemplate(state, textTemplate),
      // linkCompiled: BuildTemplate(state, linkTemplate),
      ...state
    }

    this.handleChange = this.handleChange.bind(this);
  }

  setAmounts() {
    const {
      monthlyAmount1,
      monthlyAmount2,
      monthlyAmount3,
      monthlyAmount4,
      monthlyAmount5
    } = this.state;

    this.setState({
      amounts: compact([
        monthlyAmount1,
        monthlyAmount2,
        monthlyAmount3,
        monthlyAmount4,
        monthlyAmount5])
    })
  }

  fetchCurrencyData() {
    axios.get('https://openexchangerates.org/api/latest.json?app_id=b35691a10625439b84bd3638ee37b741')
      .then(resp => {
        this.setState({ rates: resp.data.rates })
      })
  }

  componentDidMount() {
    this.fetchCurrencyData();
    this.setAmounts();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setAmounts();
  }

  handleSwitch(section) {
    this.setState({section});
  }

  switchLang(lang) {
    this.setState({lang});
  }

  render() {
    const form = ( (section) => {
      switch(section) {
        case 'nonDonor':
          return <NonDonorEmailForm
            handleChange={this.handleChange.bind(this)}
            {...this.state}
          />;
        case 'monthly':
          return <MonthlyFundraiserForm
            handleChange={this.handleChange.bind(this)}
            {...this.state}
          />;
        default:
          return '';
      }
    })(this.state.section);

    const lang = this.state.lang;
    return (
      <div className='section'>
        <div className='container'>
          <nav className="breadcrumb">
            <ul>
              <li className={lang === 'en' ? 'is-active' : ''}>
                <a onClick={(e) => e.preventDefault() || this.switchLang('en')} >En</a>
              </li>
              <li className={lang === 'fr' ? 'is-active' : ''}>
                <a onClick={(e) => e.preventDefault() || this.switchLang('fr')} >Fr</a>
              </li>
              <li className={lang === 'de' ? 'is-active' : ''}>
                <a onClick={(e) => e.preventDefault() || this.switchLang('de')} >De</a>
              </li>
            </ul>
          </nav>
          <Menu switchTo={this.handleSwitch.bind(this)} section={this.state.section} />
          {form}
        </div>
      </div>
    )
  }
}


export default Generator;
