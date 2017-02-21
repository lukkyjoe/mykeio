import React, { Component, PropTypes } from 'react';
import styles from './Question.css';


class Question extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      isOnCall: false
    };
  }

  onAnswerClick() {
    this.props.connection.send({
      type: 'ANSWER_REQUEST',
      payload: this.props.host
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={this.onAnswerClick.bind(this)}>
            <img className={styles.check} src='img/check.png'></img>
          </div>
          <div className={styles.button}>
            <img className={styles.cross} src='img/cross.png'></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
