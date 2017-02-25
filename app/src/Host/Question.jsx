import React, { Component, PropTypes } from 'react';
import styles from './Question.css';


class Question extends Component {

  constructor(props) {
    super(props);    
    console.log(props.user);
    this.state = {
      isOnCall: false
    };
    this.user = props.user;
  }

  onAnswerClick() {
    this.props.connection.send({
      type: 'ANSWER_REQUEST',
      payload: this.props.host
    });
    this.setState({
      isOnCall: true
    });
  }


  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.username}>{this.props.user.username}</h2>
        <div className={styles.buttonContainer}>
          <div style={this.state.isOnCall ? {backgroundColor: "red"} : undefined} className={styles.button} onClick={this.onAnswerClick.bind(this)}>
            <img className={styles.check} src='img/microphone.png'></img>
          </div>
          <div className={styles.button} onClick={()=>(this.props.onCancelQuestion(this.props.user.id))}>
            <img className={styles.cross} src='img/cross.png'></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
