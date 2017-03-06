import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class IncorrectSubmission extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.feedback);
    let correctAnswersArray = this.props.feedback.choices.filter((choice) => {
      return choice.correctAnswer === 'true';
    });
    let correctAnswers = correctAnswersArray.map((a, index) => {
      return (
        <div key={index}>
          {a.choice}
        </div>
      );
    });

    return (
      <div className={styles.incorrect}>
        Incorrect! <p></p>Correct answer{correctAnswersArray.length > 1 ? 's' : ''}: {[...correctAnswers]}
      </div>
    );
  }
}

export default IncorrectSubmission;