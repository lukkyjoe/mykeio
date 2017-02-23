import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class FeedbackMain extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.submitAnswer = this.submitAnswer.bind(this);
  }

    
  submitAnswer(index) {
    this.props.connection.send({
      type: 'FEEDBACK_RESPONSE',
      payload: {
        peerid: this.props.peerid,
        quizuuid: this.props.feedback.uuid,
        index: index
      }
    });
  } 

  render() {
    let options = this.props.feedback.choices.map((a, index)=>(<div value={a.choice} onClick={()=>{ this.submitAnswer(index); }} className={styles.container} key={index}>{a.choice}</div>));
    return ( 
      <div>
        <div className={styles.container}>
          {this.props.feedback.promptText}
        </div>
        {[...options]}
      </div>
    );
  }
}

export default FeedbackMain;