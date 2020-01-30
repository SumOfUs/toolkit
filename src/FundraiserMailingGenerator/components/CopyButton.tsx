// @flow
import React, { Component } from 'react';
import { Button, Icon } from 'react-bulma-components';
import copy from 'copy-to-clipboard';

type Props = {
  textFn: () => string;
  label?: string;
  disabled?: boolean;
  children?: typeof React.Children;
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
  };

  buttonText() {
    if (this.state.hasCopied) {
      return <span style={{ color: 'red' }}>Copied</span>;
    } else {
      if (this.props.children) {
        return <span>{this.props.children}</span>;
      }
      return <span>Copy to clipboard</span>;
    }
  }

  render() {
    const { disabled } = this.props;
    return (
      <Button onClick={this.copy} disabled={disabled}>
        <Icon size="small">
          <i className="far fa-copy" />
        </Icon>
        {this.buttonText()}
      </Button>
    );
  }
}
