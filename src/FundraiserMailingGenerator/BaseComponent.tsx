// @flow

import React, { Component, SyntheticEvent } from 'react';
import { debounce } from 'lodash';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Form } from 'react-bulma-components';
import { fetchRates } from './utils/exchange-rates';
import { hydrate, save } from './state/localStorage';
import SuggestedAmountsBasic from './components/SuggestedAmountsBasic';
import SuggestedAmountsDonors from './components/SuggestedAmountsDonors';
import FixedAmountBox from './components/FixedAmountBox';
import BoxButtonHTML from './components/BoxTextHTML';
import Menu from './components/Menu';
import SwitchLanguage from './components/SwitchLanguage';
import Toggle from 'react-toggle';
import styles from './utils/styles';
import './BaseComponent.css';
import 'react-toggle/style.css';
import * as CSS from 'csstype';

import { Rates } from './utils/exchange-rates';

export type StyleList = { [key: string]: CSS.Properties };

export type State = {
  url: string;
  rates: Rates | null;
  lang: string;
  themeName: 'classic' | 'rebranding';
};

class Generator extends Component<void, State> {
  _debouncedSave: any;

  static defaultState: State = {
    url: 'https://actions.sumofus.org/a/donate',
    rates: null,
    lang: 'en',
    themeName: 'classic',
  };

  constructor(props: void) {
    super(props);
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

  handleThemeChange = (event: SyntheticEvent<HTMLInputElement>) => {
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

          <Form.Field className="BaseComponent-url">
            <label className="label">Page URL</label>
            <Form.Input
              type="text"
              name="pageUrl"
              onChange={e =>
                this.setState({
                  url: e.currentTarget.value,
                })
              }
              value={this.state.url}
            />
          </Form.Field>

          <Router>
            <Route
              exact
              path="/fundraiser-mailing"
              component={() => (
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
              path="/fundraiser-mailing/box-button-html"
              component={() => (
                <BoxButtonHTML
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
              component={() => (
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
              component={() => (
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
