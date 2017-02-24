import React, { Component } from 'react';
import styles from './Feedback.css';


class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  sendQuiz() {
    for (var i = 0; i < this.props.clients.length; i++) {
      let connection = this.props.connections[this.props.clients[i].id];
      let uuid = this.props.uuid;
      connection.send({
        type: 'START_FEEDBACK',
        payload: uuid,
      });
    }
  }

  onPromptClick() {
    this.props.selectPrompt(this.props.uuid);
  }

  render() {
    return (
      <div className={styles.container} onClick={this.onPromptClick.bind(this)}>
        <div className={styles.buttonContainer}>
          <p className={styles.promptText}>
            {this.props.promptText}     
          </p>
          <div className={styles.button} onClick={this.sendQuiz.bind(this)}>
            <img className={styles.check} src='img/send.svg'></img>
          </div>
          <div className={styles.button}>
            <img className={styles.cross} src='img/cross.png'></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
