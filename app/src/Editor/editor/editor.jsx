import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';
import PromptCount from './promptCount.jsx'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    }
  }

  render() {
    return (
      <div>
        <PromptCount /> 
        <h2>Settings</h2>    
          <Prompt />                     
      </div>
    )
  }
}

export default Editor;

//remove when not testing
ReactDOM.render(<Editor />, document.getElementById('app'));