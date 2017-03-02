import React from 'react';
import styles from './hostQuestion.css';

class HostQuestion extends React.Component {

  handleUpdateClick(event) {
    event.preventDefault();
    this.props.updatePrompt(this.refs.promptInput.value);
  }

  render() {
    return (
      <div>
        <form className={styles.hostQuestionContainer} onSubmit={this.handleUpdateClick.bind(this)}>
         <div className={styles.titleAndBody}>
           <input className={styles.title} placeholder="Title Required" ref="promptInput" required onChange={this.handleUpdateClick.bind(this)}></input>         
         {/*add tiny MCE, THIS TEXT ARE DOESNT GO ANYWHERE YET*/}
         </div>
        </form>
      </div>
    );
  }
}

export default HostQuestion;
