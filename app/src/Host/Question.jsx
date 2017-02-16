import React, { Component, PropTypes } from 'react';
import styles from './Question.css';

class Question extends Component {

  constructor(props) {
    super(props);
  }


  onAnswerClick() {
    this.props.peer;
  
  } 
  render() {
    return (
      <div className={styles.base}>
        
      </div>
    );
  }
}

export default Question;
