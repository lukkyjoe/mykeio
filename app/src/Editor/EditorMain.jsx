import React, { Component, PropTypes } from 'react';
import styles from './EditorMain.css';
import $ from 'jquery';
// import Editor from './editor/editor.jsx';
import NeoPrompt from './editor/neoPrompt.jsx';
import PromptCount from './editor/promptCount.jsx';

class EditorMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomData: "hi",
      prompts: []
    }
    this.updatePromptField = this.updatePromptField.bind(this);
  }

  updatePromptField(update, index) {
    let newArray = this.state.prompts.slice();
    newArray[index] = update;
    this.setState({prompts: newArray})
  }

  renderPrompts() {
    // pass promptTemplate down as props to each prompt?
      // if individual prompt changes, set the state back at editor level to reflect that change 
    const listOfPrompts = this.state.prompts.map((prompt, index) => <NeoPrompt key={index} index={index} updatePromptField={this.updatePromptField}/>);
    return listOfPrompts;
  }

// if change to +1 only button, consider the concat option from http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
  addPrompt() {
    console.log('adding another prompt');
    let newArray = this.state.prompts.slice();
    newArray.push(this.state.promptTemplate);
    this.setState({prompts: newArray}) ;
    console.log('this.state is', this.state)
  }

  createRoom() {
    console.log(this.state);
    $.post('/api/createRoom', {
      roomTitle: 'A v hella dank room.',
      feedback: [ 
        {
          type: 'MULTIPLE_CHOICE',
          prompt: 'WHAT IS LOVE?',
          trackAnsweres: false,
          giveFeedback: true,
          options: [
            {
              text: 'baby dont hurt me',
              isCorrect: true
            },
            {
              text: 'dont hurt me',
              isCorrect: true
            },
            {
              text: 'no more',
              isCorrect: true
            },
          ]
        },
        {
          type: 'TEXT',
          prompt: 'This one time at band camp you:'
        }
      ]
    }
  )
      .done((data)=>{
        window.location.href = '/#/host/' + data;
      }).fail((data)=>{
        console.log(data);
      });
  }

  render() {
    return (
      <div className={styles.base}>
        <Editor />
        <PromptCount addPrompt={this.addPrompt.bind(this)} /> 
        <h2>Settings</h2>   
        {this.renderPrompts()}
        <button onClick={this.createRoom.bind(this)}>Create Room with Fake Data</button>
      </div>
    );
  }
}

export default EditorMain;
