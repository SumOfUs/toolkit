import React, { Component } from 'react';
import {Field, Input } from 'reactbulma'
import axios from 'axios';
import delimiters from 'handlebars-delimiters';
import Handlebars from 'handlebars';
import { CopyToClipboard } from 'react-copy-to-clipboard';

delimiters(Handlebars, ['<%', '%>']);

const suggestedAskConditional = `
{% if suggested_ask_via_usd >= 51 %}
{% else %}
  {% if user.country == "Australia" %}
    AU\${{ suggested_ask_via_usd |multiply:"<% AUD %>" |floatformat:"0" }}
    {% elif user.country == "New Zealand" %}
    NZ\${{ suggested_ask_via_usd |multiply:"<% NZD %>" |floatformat:"0" }}
    {% elif user.country == "Canada" %}CA\${{ suggested_ask_via_usd |multiply:"<% CAD %>" |floatformat:"0" }}
    {% elif user.country == "Germany" or user.country == "France" or user.country == "Spain" or user.country == "Sweden" or user.country == "Norway" or user.country == "Denmark" or user.country == "Italy" or user.country == "Belgium" %}{{ suggested_ask_via_usd |multiply:"<% EUR %>" |floatformat:"0"}} &euro;
    {% elif user.country == "Ireland" or user.country == "Austria" or user.country == "Netherlands" %}&euro;{{ suggested_ask_via_usd |multiply:"<% EUR %>" |floatformat:"0"}}
    {% elif user.country == "United Kingdom" %}&pound;{{ suggested_ask_via_usd |multiply:"<% GBP %>" |floatformat:"0"}}
    {% elif user.country == "Switzerland" %}CHF{{ suggested_ask_via_usd |multiply:"1" |floatformat:"0" }}
    {% else %}\${{ suggested_ask_via_usd }}
  {% endif %}
{% endif %}
`;

const queryString = `
source=fwd&amp;donation_band=
{% if suggested_ask_via_usd <= 1 %}
  nondonor
{% elif suggested_ask_via_usd <= 19 %}
  lowdonor
{% elif suggested_ask_via_usd <= 50 %}
  middonor
{% elif suggested_ask_via_usd <= 100 %}
  highdonor
{% else %}
  vhighdonor
{% endif %}
`;

const textTemplate = Handlebars.compile(`
<p><% pre %> {% if suggested_ask_via_usd >= 51 %}
  {% else %}
    {% if user.country == "Australia" %}AU\${{ suggested_ask_via_usd |multiply:"<% AUD %>" |floatformat:"0" }}
    {% elif user.country == "New Zealand" %}NZ\${{ suggested_ask_via_usd |multiply:"<% NZD %>" |floatformat:"0" }}
    {% elif user.country == "Canada" %}CA\${{ suggested_ask_via_usd |multiply:"<% CAD %>" |floatformat:"0" }}
    {% elif user.country == "Germany" or user.country == "France" or user.country == "Spain" or user.country == "Sweden" or user.country == "Norway" or user.country == "Denmark" or user.country == "Italy" or user.country == "Belgium" %}
      {{ suggested_ask_via_usd |multiply:"<% EUR %>" |floatformat:"0"}} &euro;
  {% elif user.country == "Ireland" or user.country == "Austria" or user.country == "Netherlands" %}&euro;{{ suggested_ask_via_usd |multiply:"<% EUR %>" |floatformat:"0"}}
  {% elif user.country == "United Kingdom" %}&pound;{{ suggested_ask_via_usd |multiply:"<% GBP %>" |floatformat:"0"}}
  {% elif user.country == "Switzerland" %}CHF{{ suggested_ask_via_usd |multiply:"1" |floatformat:"0" }}
  {% else %}\${{ suggested_ask_via_usd }} {% endif %}
  {% endif %} <% post %></p>
`);


const buttonTemplate = Handlebars.compile(`
  <div style="text-align: center; padding-bottom: 10px;" align="center">
    <center>
      <!-- BOX LINK -->
      <a style="
        background-color: #dc6134;
        border: 1px solid #dc6134;
        border-radius: 3px;
        color: #ffffff;
        display: block;
        font-family: sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        line-height: 44px;
        text-align: center;
        font-weight: bold;
        text-decoration: none;
        width: 90%;
        -webkit-text-size-adjust: none;
        white-space: nowrap;
        box-shadow: inset 0 -1.2px rgba(0, 0, 0, 0.12) !important;" title="SumOfUs" href="<% pageUrl %>?${queryString}">
          <% pre %>&nbsp;${suggestedAskConditional}&nbsp;<% post %>
        </a>
      </center>
    </div>
`);

const linkTemplate = Handlebars.compile(`
  <p>
    <a style="font-size: 14px; font-weight: bold; color: #00abbd;" href="<% pageUrl %>?source=fwd&amp;donation_band=${queryString}">
      <% linkPre %>&nbsp;${suggestedAskConditional}&nbsp;<% linkPost %>
    </a>
  </p>
`);

const Data = state => {
  const plainText = state.plainText.split('$');
  const linkText = state.linkText.split('$');

  const memo = Object.assign(state, state.rates, {
    plainPre:   plainText[0].trim(),
    plainPost:  plainText[1].trim(),
    linkPre:    linkText[0].trim(),
    linkPost:   linkText[1].trim(),
  });

  return memo;
}

const BuildTemplate = (state, template) => {
  const html = template(Data(state))
    .split(/(\r\n|\n|\r)/)
    .map( line => line.trim())
    .join('');

  return html;
}

class Generator extends Component {
  constructor(props) {
    super(props)
    const state = {
      pageUrl: 'https://foobar.com',
      plainText: "Can you chip in $ to keep nestle's hands off our water",
      linkText: "Can you chip in $ to keep nestle's hands off our water",
      rates: {},
    }

    this.state = {
      buttonCompiled: BuildTemplate(state, buttonTemplate),
      plainCompiled: BuildTemplate(state, textTemplate),
      linkCompiled: BuildTemplate(state, linkTemplate),
      ...state
    }

    this.handleChange = this.handleChange.bind(this);
  }

  fetchCurrencyData() {
    axios.get('https://openexchangerates.org/api/latest.json?app_id=b35691a10625439b84bd3638ee37b741')
      .then(resp => {
        this.setState({ rates: resp.data.rates })
      })
  }

  componentDidMount() {
    this.fetchCurrencyData();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      buttonCompiled: BuildTemplate(this.state, buttonTemplate),
      plainCompiled: BuildTemplate(this.state, textTemplate),
      linkCompiled: BuildTemplate(this.state, linkTemplate),
    })
  }

  render() {
    return (
      <div className='section'>
        <div className='container'>
          <h1 className='title is-3'>Fundraiser Mailing Generator</h1>
          <Field>
            <label className="label">Page URL</label>
            <Input className='is-large' type='text' name='pageUrl' onChange={ this.handleChange } value={this.state.pageUrl} />
          </Field>
          <Field>
            <label className="label">Plain Text Content</label>
            <Input className='is-large' type='text' name='plainText' onChange={ this.handleChange } value={this.state.plainText} />
          </Field>
          <Field>
            <label className="label">Link Text Content</label>
            <Input className='is-large' type='text' name='plainText' onChange={ this.handleChange } value={this.state.plainText} />
          </Field>
          <div className='buttons'>
            <CopyToClipboard text={ this.state.buttonCompiled }>
              <button className='button'>Copy Button Text</button>
            </CopyToClipboard>
            <CopyToClipboard text={ this.state.linkCompiled }>
              <button className='button'>Copy Link Text</button>
            </CopyToClipboard>
            <CopyToClipboard text={ this.state.plainCompiled }>
              <button className='button'>Copy Plain Text</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}


export default Generator;
