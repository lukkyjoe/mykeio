
import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';
import NeoPrompt from './neoPrompt.jsx';
import PromptCount from './promptCount.jsx';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      promptTemplate: 
      {
        promptText: 'Here is a scary example question',
        responseType: 'none',
        choices: [{choice: 'dummy choice', correctAnswer: false}],
        trackAnswers: false,
        giveFeedback: false
      }, 
      prompts: []
    };

    this.updatePromptField = this.updatePromptField.bind(this);
    this.deletePrompt = this.deletePrompt.bind(this);
  }

  deletePrompt(index) {
    let temp = this.state.prompts.slice();
    let out = temp.splice(index, 1);
    console.log(out);
  }

  updatePromptField(update, index) {
    let newArray = this.state.prompts.slice();
    newArray[index] = update;
    this.setState({prompts: newArray});
  }

  renderPrompts() {
    // pass promptTemplate down as props to each prompt?
      // if individual prompt changes, set the state back at editor level to reflect that change
    const listOfPrompts = this.state.prompts.map((prompt, index) => <NeoPrompt key={index} index={index} updatePromptField={this.updatePromptField}/>);
    return listOfPrompts;
  }

  addPrompt() {
    console.log('adding another prompt');
    let newArray = this.state.prompts.slice();
    newArray.push(this.state.promptTemplate);
    this.setState({prompts: newArray});
  }
  
  render() {
    return (
      <div>
        <PromptCount addPrompt={this.addPrompt.bind(this)} /> 
        <h2>Settings</h2> 
        {this.renderPrompts()}
      </div>
    );
  }
}

export default Editor;
