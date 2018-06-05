import React, { PureComponent } from 'react';

export default class PreviewPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      suggestedAsk: 10,
      country: 'US',
    };
  }

  render() {
    return <div className="PreviewPanel">Hi</div>;
  }
}
