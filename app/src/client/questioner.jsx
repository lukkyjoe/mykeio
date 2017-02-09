import React from 'react';
import ReactDOM from 'react-dom';

class Questioner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      raisedHand: false
    }
  }

  componentWillMount() {
    console.log("component will mount");
  }

  componentDidMount() {
    console.log("component did mount");
  }

  componentDidUpdate() {
    console.log("component did update");
  }  

  render() {
    return (
      <div></div>
    )
  }
}