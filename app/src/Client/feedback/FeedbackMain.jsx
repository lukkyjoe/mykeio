import React, { Component } from 'react';
import styles from './FeedbackMain.css';

class FeedbackMain extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    console.log('props in feedbackMain', props);
  }
  render() {
    let options = this.props.feedback.choices.map((a, index)=>(<div className={styles.container} key={index}>{a.choice}</div>));
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