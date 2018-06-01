import delimiters from 'handlebars-delimiters';
import Handlebars from 'handlebars';

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

const templates = {
  textTemplate,
  buttonTemplate,
  linkTemplate,
};

const Data = state => {
  const plainText = state.plainText.split('{{amount}}');
  const linkText = state.linkText.split('{{amount}}');

  const memo = Object.assign({}, state, state.rates, {
    plainPre: plainText[0].trim(),
    plainPost: plainText[1].trim(),
    linkPre: linkText[0].trim(),
    linkPost: linkText[1].trim(),
  });

  return memo;
};

export const BuildTemplate = (state, template) => {
  const html = templates[template](Data(state))
    .split(/(\r\n|\n|\r)/)
    .map(line => line.trim())
    .join('');

  return html;
};
