import React from 'react';

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      choices: []
    }
  }

  render() {
    return (
      <form>Quiz</form>
    );
  }
}

export default Quiz;