import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class FeedbackMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasClicked: false,
      optionsIsClicked: [],
      submissionIndex: undefined,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.toggleHasClicked = this.toggleHasClicked.bind(this);

    if (props.feedback.choices) {
      props.feedback.choices.forEach(()=>{ this.state.optionsIsClicked.push(false); });
      console.log('props.feedback.choices', props.feedback.choices);
    } else {
      console.log('this is not multiple choice!')
    }
  }

  toggleHasClicked(index) {
    let temp = this.state.optionsIsClicked.map(() => {
      return false;
    });
    temp[index] = true;
    this.setState({
      optionsIsClicked: temp,
      submissionIndex: index
    });
  }
  //submit the answer, then unrender the prompt
  submitMaster() {
    // give text a different case type?
    if (this.props.feedback.responseType === 'MULTIPLE_CHOICE') {
      this.submitAnswer();
      this.props.unrenderPrompt();
      this.checkAnswer();
    }
    if (this.props.feedback.responseType === 'TEXT') {
      this.submitTextInput();
    }    

  }

  submitTextInput() {
    this.props.connection.send({
      type: 'TEXT_RESPONSE',
      payload: {
        peerid: this.props.peerid,
        quizuuid: this.props.feedback.uuid,
        textResponse: "here is a text response!"
      }    
    }); 
  }

  //submit the answer sends data to host
  submitAnswer() {
    this.props.connection.send({
      type: 'FEEDBACK_RESPONSE',
      payload: {
        peerid: this.props.peerid,
        quizuuid: this.props.feedback.uuid,
        index: this.state.submissionIndex,
      }    
    }); 
  } 

  checkAnswer() {
    console.log('from feedbackMain xxxxxxxxxx', this.props.feedback);
    if (this.props.feedback.choices[this.state.submissionIndex].correctAnswer === 'true') {
      this.props.renderCorrect();
    } else if (this.props.feedback.choices[this.state.submissionIndex].correctAnswer === 'false') {
      this.props.renderIncorrect();
    }
  }


  render() {
    //add condition. map not necessary for short answers
    console.log('this.props.feedback!!!', this.props.feedback)
    let options;
    if (this.props.feedback.responseType === 'MULTIPLE_CHOICE') {
     options = this.props.feedback.choices.map((a, index)=> {
      return (
        <div 
          onClick={() => this.toggleHasClicked(index)} 
          value={a.choice} 
          className={styles.containerOptions}
          style={this.state.optionsIsClicked[index] ? {backgroundColor: 'blue'} : undefined} 
          key={index}>
          {a.choice}
        </div>
      );
    });
    }


    return ( 
      <div>
        <div className={styles.container}>
          {this.props.feedback.promptText}
        </div>
        {
          (this.props.feedback.responseType === 'MULTIPLE_CHOICE')
          ? [...options]
          : <textarea> </textarea>
        }
        <div style={{textAlign: 'center'}}>
          <button onClick={()=>{ this.submitMaster(); }}>Submit</button>
        </div>
      </div>
    );
  }
}

export default FeedbackMain;