import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class CorrectSubmission extends Component {
  render() {
    return (
      <div className={styles.correct}>
        Correct!
      </div>
    );
  }
}

export default CorrectSubmission;