
import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './prompt.jsx';
import PromptCount from './promptCount.jsx';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      promptTemplate: {
      promptText: 'Here is a scary example question',
      responseType: 'none',
      choices: [{choice: 'dummy choice', correctAnswer: false}],
      trackAnswers: false,
      giveFeedback: false
    },
      prompts: []
    };
  }

  renderPrompts() {
    // var saved = [];
    // for (var i = 0; i < this.state.numberOfPrompts; i++) {
    //   saved.push(<Prompt key={i}/>);
    // }
    // return saved;
  }

// if change to +1 only button, consider the concat option from http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
  updatePromptNumber(numberOfPrompts) {
    console.log('adding one more prompt with misnamed handler')
      let newArray = this.state.prompts.slice();
      newArray.push(this.state.promptTemplate);
      this.setState({prompts: newArray}) 
    // this.setState({numberOfPrompts});
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