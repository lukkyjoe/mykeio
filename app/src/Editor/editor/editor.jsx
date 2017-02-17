import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';
import PromptCount from './promptCount.jsx'

const testNumber = 7;

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promptCount : 0,
      prompts: []
    }
  }
  updatePromptNumber(numberOfPrompts) {
    this.state.promptCount = numberOfPrompts;
    this.setState({promptCount: numberOfPrompts});
    console.log(this.state.promptCount);
  }

  populatePrompts(){

  }

  render() {
    return (
      <div>
        <PromptCount updatePromptNumber={this.updatePromptNumber.bind(this)} /> 
        <h2>Settings</h2>    
          <Prompt />                     
      </div>
    )
  }
}

export default Editor;

//remove when not testing
ReactDOM.render(<Editor />, document.getElementById('app'));