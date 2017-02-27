import React, { Component } from 'react';

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
      <div>
        Incorrect! <p></p>Correct answer: {[...correctAnswers]}
      </div>
    );
  }
}

export default IncorrectSubmission;