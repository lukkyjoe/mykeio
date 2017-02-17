import React, { Component, PropTypes } from 'react';
import styles from './Question.css';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasVoiceQuestion:false
    }
  }

  onAnswerClick(){
    this.props.connection.send({
      type:"ANSWER_REQUEST",
      payload:this.props.host
    })
  }

  render() {
    return (
      <div className={styles.base}>
        <p>{this.props.peerid}</p>
        <button onClick={this.onAnswerClick.bind(this)}>Answer</button>
      </div>
    );
  }
}

export default Question;
