// @flow

import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Route } from 'react-router';
import { Field, Input } from 'reactbulma';

import { fetchRates } from './utils/exchange-rates';
import { hydrate, save } from './state/localStorage';

import Basic from './components/Basic';
import Donors from './components/Donors';
import FixedAmountBox from './components/FixedAmountBox';
import Menu from './components/Menu';
import SwitchLanguage from './components/SwitchLanguage';

import type { Rates } from './utils/exchange-rates';

export type State = {
  url: string,
  rates: ?Rates,
  lang: string,
};

class Generator extends Component<null, State> {
  _debouncedSave: any;

  static defaultState: State = {
    url: 'https://actions.sumofus.org/a/donate',
    rates: null,
    lang: 'en',
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

  render() {
    return (
      <div className="section">
        <div className="container">
          <SwitchLanguage
            currentLanguage={this.state.lang}
            onChange={lang => this.setState({ lang })}
          />
          <Menu />

          <div className="UrlField">
            <Field>
              <label className="label">Page URL</label>
              <Input
                type="text"
                name="pageUrl"
                onChange={e => this.setState({ url: e.target.value })}
                value={this.state.url}
              />
            </Field>
          </div>

          <Route
            exact
            path="/fundraiser-mailing"
            component={props => (
              <Basic
                url={this.state.url}
                rates={this.state.rates}
                lang={this.state.lang}
              />
            )}
          />

          <Route
            exact
            path="/fundraiser-mailing/donors"
            component={props => (
              <Donors
                url={this.state.url}
                rates={this.state.rates}
                lang={this.state.lang}
              />
            )}
          />

          <Route
            exact
            path="/fundraiser-mailing/recurring-donors"
            component={props => (
              <FixedAmountBox
                url={this.state.url}
                rates={this.state.rates}
                lang={this.state.lang}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Generator;
