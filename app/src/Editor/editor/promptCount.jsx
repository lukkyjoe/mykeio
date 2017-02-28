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
      <div className={styles.promptAndRoom}>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Add new prompt"/>
        </form>
      </div>
    );
  }
}

export default PromptCount;