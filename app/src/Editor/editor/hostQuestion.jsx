import React from 'react';
import styles from './hostQuestion.css'

class HostQuestion extends React.Component {

  handleUpdateClick(event) {
    event.preventDefault();
    this.props.updatePrompt(this.refs.promptInput.value);
  }

  render() {
    return (
      <div>
        <form className={styles.hostQuestionContainer} onSubmit={this.handleUpdateClick.bind(this)}>
         <div>
           Title: <input className={styles.item} placeholder="Title Required" ref="promptInput" required onChange={this.handleUpdateClick.bind(this)}></input>         
         </div>
         {/*add tiny MCE, THIS TEXT ARE DOESNT GO ANYWHERE YET*/}
         <div>
           Body: <textarea className={styles.item} name="myTextarea" placeholder="Explain your prompt. (optional)"></textarea>         
         </div>
        </form>
      </div>
    );
  }
}

export default HostQuestion;