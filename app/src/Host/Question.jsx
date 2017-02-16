import React, { Component, PropTypes } from 'react';
import styles from './Question.css';

class Question extends Component {

  constructor(props) {
    super(props);
  }


  onAnswerClick(){
    this.props.connection.send({
      type:"QUESTION_ANSWER"
    })
  }
  render() {
    return (
      <div className={styles.base}>
        
      </div>
    );
  }
}

export default Question;
