// @flow

import React, { Component } from 'react';
import { debounce } from 'lodash';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Field, Input } from 'reactbulma';
import { fetchRates } from './utils/exchange-rates';
import { hydrate, save } from './state/localStorage';
import SuggestedAmountsBasic from './components/SuggestedAmountsBasic';
import SuggestedAmountsDonors from './components/SuggestedAmountsDonors';
import FixedAmountBox from './components/FixedAmountBox';
import BoxTextHTML from './components/BoxTextHTML';
import Menu from './components/Menu';
import SwitchLanguage from './components/SwitchLanguage';
import Toggle from 'react-toggle';
import styles from './utils/styles';
import './BaseComponent.css';
import 'react-toggle/style.css';

import type { Rates } from './utils/exchange-rates';

export type State = {
  url: string,
  rates: ?Rates,
  lang: string,
  themeName: string,
};

console.log('box text html', BoxTextHTML)
class Generator extends Component<null, State> {
  _debouncedSave: any;

  static defaultState: State = {
    url: 'https://actions.sumofus.org/a/donate',
    rates: null,
    lang: 'en',
    themeName: 'classic',
  };

  constructor() {
    super();
    this.state = hydrate('BaseComponent', Generator.defaultState);
  }

  componentDidUpdate() {
    this._debouncedSave = this.saveState();
  }

  componentWillUnmount() {
    if (this._debouncedSave) this._debouncedSave.flush();
  }

  saveState = debounce(() => save('BaseComponent', this.state), 3000);

  async componentDidMount() {
    const rates = await fetchRates();
    this.setState({ rates });
  }

  handleThemeChange = event => {
    if (!event) return;
    const target = event.currentTarget;
    const themeName = target.checked ? 'rebranding' : 'classic';
    this.setState({ themeName });
  };

  render() {
    return (
      <div className="BaseComponent section">
        <div className="container">
          <SwitchLanguage
            currentLanguage={this.state.lang}
            onChange={lang => this.setState({ lang })}
          />
          <Menu />

          <Field className="BaseComponent-url">
            <label className="label">Page URL</label>
            <Input
              type="text"
              name="pageUrl"
              onChange={e =>
                this.setState({
                  url: e.target.value,
                })
              }
              value={this.state.url}
            />
          </Field>

          <Router>
            <Route
              exact
              path="/fundraiser-mailing"
              component={props => (
                <SuggestedAmountsBasic
                  url={this.state.url}
                  rates={this.state.rates}
                  lang={this.state.lang}
                  styles={styles[this.state.themeName] || styles.classic}
                />
              )}
            />

            <Route
              exact
              path="/fundraiser-mailing/box-text-html"
              component={props => (
                <BoxTextHTML 
                  url={this.state.url}
                  rates={this.state.rates}
                  lang={this.state.lang}
                  styles={styles[this.state.themeName] || styles.classic}
                />
              )}
            />

            <Route
              exact
              path="/fundraiser-mailing/suggested-amounts-donors"
              component={props => (
                <SuggestedAmountsDonors
                  url={this.state.url}
                  rates={this.state.rates}
                  lang={this.state.lang}
                  styles={styles[this.state.themeName] || styles.classic}
                />
              )}
            />

            <Route
              exact
              path="/fundraiser-mailing/fixed-amount"
              component={props => (
                <FixedAmountBox
                  url={this.state.url}
                  rates={this.state.rates}
                  lang={this.state.lang}
                  styles={styles[this.state.themeName] || styles.classic}
                />
              )}
            />

          </Router>

          <div className="theme-selector">
            <label htmlFor="theme-toggle">Rebranding styles:</label>
            <Toggle
              id="theme-toggle"
              defaultChecked={this.state.themeName === 'rebranding'}
              onChange={this.handleThemeChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Generator;
