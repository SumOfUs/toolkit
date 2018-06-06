// @flow
import React, { Component } from 'react';
import { Button, Icon } from 'reactbulma';
import copy from 'copy-to-clipboard';

type Props = {
  textFn: () => string,
  disabled?: boolean,
  children?: typeof React.Children,
};

type State = { hasCopied: boolean };

export default class CopyButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasCopied: false,
    };
  }

  copy = () => {
    const text = this.props.textFn();
    copy(text);
    this.setState({ hasCopied: true }, () => {
      window.setTimeout(() => this.setState({ hasCopied: false }), 3000);
    });
    console.log(text);
  };

  render() {
    const { children, disabled } = this.props;
    const { hasCopied } = this.state;
    return (
      <Button onClick={this.copy} disabled={disabled}>
        <Icon small>
          <i className="far fa-copy" />
        </Icon>
        {children}
        {hasCopied ? (
          <span style={{ color: 'red' }}>Copied</span>
        ) : (
          <span>Copy to clipboard</span>
        )}
      </Button>
    );
  }
}
