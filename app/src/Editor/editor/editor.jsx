
import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';
import neoPrompt from './neoPrompt.jsx';
import PromptCount from './promptCount.jsx';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // promptTemplate: {}
      prompts: []
    };

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

//remove when not testing
ReactDOM.render(<Editor />, document.getElementById('app'));