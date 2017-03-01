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
    console.log('this.props.uuid', this.props.uuid);
  }

  onPromptClick() {
    this.props.selectPrompt(this.props.uuid);
  }

  render() {
    return (
      <div className={styles.container} onClick={this.onPromptClick.bind(this)}>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={this.sendQuiz.bind(this)}>
            <img className={styles.send} src='img/send.png'></img>
          </div>
          <div className={styles.titleContainer}>
        <p className={styles.promptText}>
          {this.props.promptText.length > 15?this.props.promptText.substring(0,15) + '...':this.props.promptText}     
        </p>
      </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
