import React from 'react';
import ReactDOM from 'react-dom';

export const DEFAULT_TEXT = 'Ask question';
export const CLICKED_TEXT = 'Cancel';

class Questioner extends React.Component {
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

export default Questioner;