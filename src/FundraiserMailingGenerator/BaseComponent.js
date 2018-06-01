import React, { Component } from 'react';
import axios from 'axios';
import Menu from './Menu';
import NonDonorEmailForm from './NonDonorEmailForm';
import MonthlyFundraiserForm from './MonthlyFundraiserForm';
import * as en from './locales/en';
import * as fr from './locales/fr';
import * as de from './locales/de';
import { compact } from 'lodash';
import { Route } from 'react-router';

const hydrateState = () => {
  const defaultState = {
    rates: {},
    lang: 'en',
    en,
    de,
    fr,
  };
  const cache = localStorage.getItem('fundraiserMailingBuilder');
  const localState = JSON.parse(cache) || {};
  return { ...defaultState, ...localState };
}

class Generator extends Component {
  constructor(props) {
    super(props)

    this.state = hydrateState();

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
        monthlyAmount5,
      ]),
    });
  }

  fetchCurrencyData() {
    axios
      .get(
        'https://openexchangerates.org/api/latest.json?app_id=b35691a10625439b84bd3638ee37b741'
      )
      .then(resp => {
        this.setState({ rates: resp.data.rates });
      });
  }

  componentDidMount() {
    this.fetchCurrencyData();
    this.setAmounts();
  }

  handleChange(e) {
    const previousDefaults = this.state[this.lang];
    const newDefaults = {
      ...previousDefaults,
      [e.target.name]: e.target.value,
    };

    this.setState({ [this.state.lang]: newDefaults });

    this.setAmounts();
  }

  handleSwitch(section) {
    this.setState({section});
  }

  switchLang(lang) {
    import(`./locales/${lang}`).then(data => {
      console.log(data);
      this.setState({lang, ...data});
    })
  }

  formState() {
    const { rates, lang } = this.state;
    return {
      ...this.state[this.state.lang],
      rates,
      lang,
    };
  }

  render() {
    const lang = this.state.lang;
    return (
      <div className="section">
        <div className="container">
          <nav className="breadcrumb">
            <ul>
              <li className={lang === 'en' ? 'is-active' : ''}>
                <a onClick={e => e.preventDefault() || this.switchLang('en')}>
                  En
                </a>
              </li>
              <li className={lang === 'fr' ? 'is-active' : ''}>
                <a onClick={e => e.preventDefault() || this.switchLang('fr')}>
                  Fr
                </a>
              </li>
              <li className={lang === 'de' ? 'is-active' : ''}>
                <a onClick={e => e.preventDefault() || this.switchLang('de')}>
                  De
                </a>
              </li>
            </ul>
          </nav>
          <Menu
            switchTo={this.handleSwitch.bind(this)}
            section={this.state.section}
          />

          <Route
            exact
            path="/fundraiser-mailing"
            component={props => (
              <NonDonorEmailForm
                handleChange={this.handleChange.bind(this)}
                {...this.formState()}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/fundraiser-mailing/donors"
            component={() => 'Not implemented'}
          />
          <Route
            exact
            path="/fundraiser-mailing/recurring-donors"
            component={props => (
              <MonthlyFundraiserForm
                handleChange={this.handleChange.bind(this)}
                {...this.formState()}
                {...props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Generator;
