import React from 'react';

export const DEFAULT_TEXT = 'Ask question';
export const CLICKED_TEXT = 'Cancel';

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raisedHand: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => ({
      raisedHand: !this.state.raisedHand
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>{this.state.raisedHand ? CLICKED_TEXT : DEFAULT_TEXT}</button>
    );
  }
}

export default Client;