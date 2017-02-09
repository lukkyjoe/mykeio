import React from 'react';
import ReactDOM from 'react-dom';

class Questioner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      raisedHand: false
    }
  }


  render() {
    return (
      <div>This is from the questioner component!</div>
    )
  }
}

export default Questioner;