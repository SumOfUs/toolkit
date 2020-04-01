import React, { Component } from 'react';
import { Tag, Form, Section, Button, Level } from 'react-bulma-components';

import Textarea from 'react-bulma-components/lib/components/form/components/textarea';

import './App.css';
import Tweet from './Tweet';
import twitter from 'twitter-text';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class TweetTool extends Component {
  constructor(props) {
    super(props);
    console.log(window.localStorage.getItem('tweet-storm:tweets'));
    const tweets = JSON.parse(
      window.localStorage.getItem('tweet-storm:tweets') || '[]'
    );

    this.state = {
      tweets: tweets || [],
      current: '',
      valid: true,
      currentLength: 0,
    };
  }

  createTweet() {
    const tweets = this.state.tweets.concat(this.state.current);

    console.log(tweets);

    this.setState({
      tweets: tweets,
      current: '',
      currentLength: 0,
      valid: true,
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
      tweets: tweets,
    });

    window.localStorage.setItem(
      'tweet-storm:tweets',
      JSON.stringify(tweets, null, 2)
    );
  }

  handleChange(e) {
    const text = e.currentTarget.value;
    const result = twitter.parseTweet(text);
    console.log('result =>', result);
    this.setState({
      current: text,
      currentLength: result.weightedLength,
      valid: result.valid,
    });
  }

  tweetsArray() {
    let outputText = `<script>
  var tweets = ${JSON.stringify(this.state.tweets)};
</script>`;

    return outputText;
  }

  onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.createTweet();
    }
  }

  render() {
    const tweets = this.state.tweets.map((tweet, i) => {
      return (
        <Tweet
          text={tweet}
          index={i}
          key={i}
          handleDelete={this.handleDelete.bind(this)}
        />
      );
    });

    const warningClass = this.state.valid ? 'is-info' : 'is-danger';

    return (
      <div>
        <Section>
          <h1 className="title">Tweet Maker</h1>
          <h2>
            Write a tweet and <strong>press enter</strong>.
          </h2>
          <form
            ref={el => (this.myFormRef = el)}
            className="form"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Field>
              <Form.Control>
                <Textarea
                  onKeyDown={this.onEnterPress.bind(this)}
                  autoFocus
                  className={warningClass}
                  onChange={this.handleChange.bind(this)}
                  value={this.state.current}
                ></Textarea>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Tag className={`is-large ${warningClass}`}>
                {this.state.currentLength}
              </Tag>{' '}
              chars
            </Form.Field>
          </form>
          <div className="tweets">{tweets}</div>
        </Section>

        <section className="section raw">
          <h2>When you're done, click below to copy your tweets...</h2>
          <Form.Field>
            <Form.Control>
              <CopyToClipboard
                text={this.tweetsArray()}
                onCopy={() => this.setState({ copied: true })}
              >
                <Form.Field>
                  <Level>
                    <Level.Side align="left">
                      <Level.Item>
                        <Button>Copy to clipboard</Button>
                      </Level.Item>
                      <Level.Item>
                        {this.state.copied ? (
                          <Tag className="is-success">Copied.</Tag>
                        ) : (
                          ''
                        )}
                      </Level.Item>
                    </Level.Side>
                  </Level>
                </Form.Field>
              </CopyToClipboard>
            </Form.Control>
          </Form.Field>
        </section>
      </div>
    );
  }
}

export default TweetTool;
