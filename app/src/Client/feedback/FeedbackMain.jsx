import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class FeedbackMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasClicked: false,
      options: [],
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.toggleHasClicked = this.toggleHasClicked.bind(this);

    props.feedback.choices.forEach(()=>{ this.state.options.push(false); });
  }

  toggleHasClicked(event) {
    event.target.setAttribute('style', 'background-color: blue');
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
    let options = this.props.feedback.choices.map((a, index)=> {
      return (
        <div 
          onClick={this.toggleHasClicked} 
          value={a.choice} 
          className={styles.containerOptions} 
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
        <button onClick={()=>{ this.submitAnswer(index); }}>Submit</button>
      </div>
    );
  }
}

export default FeedbackMain;