import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class FeedbackMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasClicked: false,
      optionsIsClicked: [],
      submissionIndex: undefined,
      textAreaValue: '',
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.toggleHasClicked = this.toggleHasClicked.bind(this);

    if (props.feedback.choices) {
      props.feedback.choices.forEach(()=>{ this.state.optionsIsClicked.push(false); });
      console.log('props.feedback.choices', props.feedback.choices);
    } else {
      console.log('this is not multiple choice!');
    }
  }

  toggleHasClicked(index) {
    let temp = this.state.optionsIsClicked.map(() => {
      return false;
    });
    temp[index] = true;
    console.log('THIS IS THE STATE BEFORE', this.state);
    this.setState({
      optionsIsClicked: temp,
      submissionIndex: index
    }, ()=> {
      console.log('THIS IS THE STATE NOW', this.state);
    });
  }
  //submit the answer, then unrender the prompt
  submitMaster() {
    if (this.props.feedback.responseType === 'MULTIPLE_CHOICE') {
      if (this.state.submissionIndex === undefined) {
        return;
      }
      this.submitAnswer();
      this.props.unrenderPrompt();
      this.checkAnswer();
    }
    if (this.props.feedback.responseType === 'TEXT') {
      this.submitTextInput();
      this.props.unrenderPrompt();
    }    

  }

  submitTextInput() {
    this.props.connection.send({
      type: 'TEXT_RESPONSE',
      payload: {
        peerid: this.props.peerid,
        quizuuid: this.props.feedback.uuid,
        textResponse: this.state.textAreaValue,
        clientData: this.props.clientData
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

  textAreaChange(event) {
    this.setState({textAreaValue: event.target.value});
  }

  render() {
    //add condition. map not necessary for short answers
    console.log('this.props.feedback!!!', this.props.feedback);
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
        <div className={styles.choicesContainer}>
          {
            (this.props.feedback.responseType === 'MULTIPLE_CHOICE')
              ? [...options]
              : <textarea className={styles.textInput} cols="30" rows="9" onChange={this.textAreaChange.bind(this)}> </textarea>
          }
        </div>
        <div style={{textAlign: 'center'}}>
          <div className={styles.submitButton} onClick={()=>{ this.submitMaster(); }}>
            <p className={styles.submitButtonText}>Submit</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackMain;
