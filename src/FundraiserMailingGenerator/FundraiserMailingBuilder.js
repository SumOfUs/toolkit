import delimiters from 'handlebars-delimiters';
import Handlebars from 'handlebars';

delimiters(Handlebars, ['<%', '%>']);

const generateLink = ({rates, pageUrl, currency, lang, linkText, recurringDefault}, amount) => {
  const textParts = linkText.split('$');
  let convertedAmount = parseInt(rates[currency] * amount, 10);
  convertedAmount = new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(convertedAmount);

  let recurringDefaultParam = '';

  if(recurringDefault !== ''){
    recurringDefaultParam = `&amp;recurring_default=${recurringDefault}`;
  }

  console.log(recurringDefaultParam);

  return (
    `<a style="background-color: #dc6134; border: 1px solid #dc6134; border-radius: 3px; color: #ffffff; display: block; font-family: sans-serif; font-size: 14px; text-transform: uppercase; line-height: 44px; text-align: center; font-weight: bold; text-decoration: none; width: 90%; max-width: 350px; -webkit-text-size-adjust: none; white-space: nowrap; box-shadow: inset 0 -1.2px rgba(0, 0, 0, 0.12) !important;"
        title="SumOfUs"
        href="${pageUrl}?amount=${amount}${recurringDefaultParam}&amp;currency=${currency}&amp;source=fwd">
      ${textParts[0]} ${convertedAmount} ${textParts[1]}
    </a>`
  );
};

const otherAmountLink = ({pageUrl, currency, donateAnotherAmountText, recurringDefault}) => {
  let recurringDefaultParam = '';

  if(recurringDefault !== ''){
    recurringDefaultParam = `&amp;recurring_default=${recurringDefault}`;
  }

  return (
    `<div style="padding-bottom: 10px;">
      <a style="color: #00abbd; font-family: sans-serif; font-size: 14px; line-height: 44px; font-weight: bold;" title="SumOfUs"
        href="${pageUrl}?currency=${currency}${recurringDefaultParam}&amp;source=fwd">
        ${donateAnotherAmountText}
      </a>
      <br />
    </div>`
  );
};

const section = (amounts, opts) => {
  let content = amounts.map( amount => (`
    <div style="padding-bottom: 10px;">
      ${generateLink(opts, amount)}
      <br />
    </div>
  `));

  content.push(otherAmountLink(opts))
  return content.join('');
};

export default (opts) => {
  const amounts = opts.amounts;

  let html = `
    {% if user.country == "Australia" %}
      ${section(amounts, Object.assign({}, opts, { currency: 'AUD' }))}
    {% elif user.country == "Canada" %}
      ${section(amounts, Object.assign({}, opts, { currency: 'CAD' }))}
    {% elif user.country == "United Kingdom" %}
      ${section(amounts, Object.assign({}, opts, { currency: 'GBP' }))}
    {% elif user.country == "New Zealand" %}
      ${section(amounts, Object.assign({}, opts, { currency: 'NZD' }))}
    {% elif user.country == "Germany" or user.country == "France" or user.country == "Spain" or user.country == "Sweden" or user.country == "Norway" or user.country == "Denmark" or user.country == "Italy" or user.country == "Belgium" or user.country == "Ireland" or user.country == "Netherlands" or user.country == "Austria" %}
      ${section(amounts, Object.assign({}, opts, { currency: 'EUR' }))}
    {% elif user.country == "Switzerland" %}
      ${section(amounts, Object.assign({}, opts, { currency: 'CHF' }))}
    {% else %}
      ${section(amounts, Object.assign({}, opts, { currency: 'USD' }))}
    {% endif %}
  `;

  return html;
}
