import React, { Component } from 'react';
import { Tag, Control, Field, Section, Textarea, Button, Level } from 'reactbulma'
import './App.css';
import Tweet from './Tweet';
import twitter from 'twitter-text';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class TweetTool extends Component {
  constructor(props) {
    super(props);
    console.log(window.localStorage.getItem('tweet-storm:tweets'));
    const tweets = JSON.parse(
      window.localStorage.getItem('tweet-storm:tweets') || "[]"
    );

    this.state = {tweets: tweets || [], current: '', valid: true, currentLength: 0}
  }

  createTweet() {
    const tweets = this.state.tweets.concat(this.state.current);

    console.log(tweets);

    this.setState({
      tweets: tweets,
      current: '',
      currentLength: 0,
      valid: true
    });

    window.localStorage.setItem('tweet-storm:tweets', JSON.stringify(tweets));
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.elements[0].focus();
    this.createTweet();
  }

  handleDelete(index) {
    const tweets = this.state.tweets.filter((tweet, i) => {
      return i !== index;
    });

    this.setState({
      tweets: tweets
    });

    window.localStorage.setItem('tweet-storm:tweets', JSON.stringify(tweets, null, 2));
  }

  handleChange(e) {
    const text = e.target.value;
    const result = twitter.parseTweet(text);

    this.setState({
      current: text,
      currentLength: result.weightedLength,
      valid: result.valid
    });
  }

  tweetsArray() {
      let outputText =
`<script>
  var tweets = ${JSON.stringify(this.state.tweets)};
</script>`;

      return outputText;
  }

  onEnterPress(e) {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.createTweet();
    }
  }

  render() {
    const tweets = this.state.tweets.map( (tweet, i) => {
      return <Tweet text={tweet} index={i} key={i} handleDelete={this.handleDelete.bind(this)} />;
    });

    const warningClass = this.state.valid ? 'is-info' : 'is-danger';

    return (
      <div>
          <Section>
          <h1 className="title">Tweet Maker</h1>
          <h2>Write a tweet and <strong>press enter</strong>.</h2>
          <form ref={el => this.myFormRef = el} className='form' onSubmit={this.handleSubmit.bind(this)} >
            <Field>
              <Control>
              <Textarea
                onKeyDown={this.onEnterPress.bind(this)}
                autoFocus
                className={warningClass}
                onChange={this.handleChange.bind(this)}
                value={this.state.current}>
              </Textarea>
              </Control>
          </Field>
          <Field>
            <Tag className={`is-large ${warningClass}`}>{this.state.currentLength}</Tag> chars
          </Field>
        </form>
        <div className='tweets'>
          {tweets}
        </div>
        </Section>

      <section className='section raw'>
      <h2>When you're done, click below to copy your tweets...</h2>
      <Field>
        <Control>
        <CopyToClipboard text={this.tweetsArray()}
          onCopy={() => this.setState({copied: true})}>
          <Field>
            <Level>
            <Level.Left>
              <Level.Item>
                <Button>Copy to clipboard</Button>
              </Level.Item>
              <Level.Item>
                {this.state.copied ? <Tag className='is-success'>Copied.</Tag> : ''}
              </Level.Item>
              </Level.Left>
            </Level>
          </Field>
        </CopyToClipboard>
        </Control>
        </Field>
      </section>
      </div>
    );
  }
}

export default TweetTool;
