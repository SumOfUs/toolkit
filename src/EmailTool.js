import React, { Component } from 'react';
import { Message, Tag, Control, Field, Section, Textarea, Button, Level, Input } from 'reactbulma'
import './App.css';
import Tweet from './Tweet';
import twitter from 'twitter-text';
import EmailForm from './components/EmailForm';
import EmailPreview from './components/EmailPreview';
import CopyContent from './components/CopyContent';

class EmailTool extends Component {
  constructor(props) {
    super(props);

    const emails = JSON.parse(
      window.localStorage.getItem('email-storm:emails') || "[]"
    );

    this.state = { emails };
  }

  handleSubmit(e) {
    e.preventDefault();

    const { subject, to, body } = this.state;
    const newEmail = { subject, to, body };
    const emails = this.state.emails.concat(newEmail);

    this.setState((state, props) => {
      return {
        ...state,
        emails: emails
      }
    });

    window.localStorage.setItem('email-storm:emails', JSON.stringify(emails));
  }

  handleDelete(index) {
    const emails = this.state.emails.filter((_, i) => {
      return i !== index;
    });

    this.setState({
      emails: emails
    });

    window.localStorage.setItem('email-storm:emails', JSON.stringify(emails));
  }

  handleChange(e) {
    const target = e.target;
    const text = target.value;
    const name = target.name;

    this.setState( (state, props) => {
      return {
        ...state,
        [name]: text
      }
    });
  }

  output() {
    let outputText =
`<script>
var emails = ${JSON.stringify(this.state.emails)};
</script>`;

    return outputText;
  }

  handleOnCopy() {
    this.setState({copied: true});
  }

  render() {
    const emails = this.state.emails.map( (email, i) => {
      return <EmailPreview {...email} index={i} key={i} handleDelete={this.handleDelete.bind(this, i)} />;
    });

    return (
      <div>
          <Section>
            <h1 className="title">Email Maker</h1>
            <form className='form' onSubmit={this.handleSubmit.bind(this)} >
              <EmailForm handleChange={this.handleChange.bind(this)} {...this.state.current} />
            </form>
          </Section>
          <Section>
            {emails}
          </Section>
          <Section className='raw'>
            <h2>When you're done, click below to copy your Emails...</h2>
            <CopyContent
              dataAsJSON={ this.output.bind(this) }
              handleOnCopy={ this.handleOnCopy.bind(this) }
              handleDelete={ this.handleDelete.bind(this) }
              copied={ this.state.copied }
            />
          </Section>
      </div>
    );
  }
}

export default EmailTool;
