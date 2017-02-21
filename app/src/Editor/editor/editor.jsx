
import React from 'react';
import ReactDOM from 'react-dom';
import NeoPrompt from './neoPrompt.jsx';
import PromptCount from './promptCount.jsx';
import ShortID from 'shortid';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      promptTemplate: 
      {
        promptText: 'Here is a scary example question',
        responseType: 'none',
        choices: [{choice: 'dummy choice', correctAnswer: false}],
        giveFeedback: false
      }, 
      prompts: []
    };

    this.updatePromptField = this.updatePromptField.bind(this);
    this.deletePrompt = this.deletePrompt.bind(this);
  }

  deletePrompt(index) {
    let temp = this.state.prompts.slice();
    temp.splice(index, 1);
    this.setState({prompts: temp}, function() {
      console.log(this.state.prompts);
    });
  }

  updatePromptField(update, index) {
    let newArray = this.state.prompts.slice();
    newArray[index] = Object.assign({ uuid: newArray[index].uuid }, update);
    this.setState({prompts: newArray});
  }

  renderPrompts(prompts) {
    // pass promptTemplate down as props to each prompt?
      // if individual prompt changes, set the state back at editor level to reflect that change
    const listOfPrompts = prompts.map((prompt, index) => {
      return (
        <NeoPrompt 
          deletePrompt={() => this.deletePrompt(index)} 
          key={prompt.uuid} 
          index={index} 
          updatePromptField={this.updatePromptField} />
      );
    });
    return listOfPrompts;
  }

  addPrompt() {
    let newArray = this.state.prompts.slice();
    var newPrompt = Object.assign({uuid: ShortID.generate()}, this.state.promptTemplate);
    newArray.push(newPrompt);
    this.setState({prompts: newArray});
  }
  
  render() {
    return (
      <div>
        <PromptCount addPrompt={this.addPrompt.bind(this)} /> 
        <h2>Settings</h2> 
        {this.renderPrompts(this.state.prompts)}
      </div>
    );
  }
}

export default Editor;
