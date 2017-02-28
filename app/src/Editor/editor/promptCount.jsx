import React, { Component } from 'react';
import styles from '../EditorMain.css';

class PromptCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptNumber: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.addPrompt();

  }
  render() {
    return (
      <div className={styles.promptAndRoom} onClick={this.handleSubmit}>
        <p className={styles.buttonText}>
          Add Prompt
        </p>
      </div>
    );
  }
}

export default PromptCount;