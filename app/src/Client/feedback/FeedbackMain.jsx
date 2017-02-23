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

    props.feedback.choices.forEach(()=>{ this.state.optionsIsClicked.push(false); });
    console.log(props.feedback.choices);
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

  render() {
    let options = this.props.feedback.choices.map((a, index)=> {
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

    return ( 
      <div>
        <div className={styles.container}>
          {this.props.feedback.promptText}
        </div>
        {[...options]}
        <button onClick={()=>{ this.submitAnswer(); }}>Submt</button>
      </div>
    );
  }
}

export default FeedbackMain;