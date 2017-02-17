
import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';
import PromptCount from './promptCount.jsx';

const testNumber = 7;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      prompts: []
    };
  }

  renderPrompts() {
    var saved = [];
    for (var i = 0; i < this.state.numberOfPrompts; i++) {
      saved.push(<Prompt />);
    }
    return saved;
  }

  updatePromptNumber(numberOfPrompts) {
    this.setState({numberOfPrompts});
  }
  
  render() {
    return (
      <div>
        <PromptCount updatePromptNumber={this.updatePromptNumber.bind(this)} /> 
        <h2>Settings</h2>   
        {this.renderPrompts()}
      </div>
    );
  }
}

export default Editor;

//remove when not testing
ReactDOM.render(<Editor />, document.getElementById('app'));