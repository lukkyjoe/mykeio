import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';

class Editor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Settings</h2>    
          <Prompt />                 
      </div>
    )
  }
}

export default Editor;

//remove when not testing
ReactDOM.render(<Editor />, document.getElementById('app'));