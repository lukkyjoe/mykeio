import React from 'react';
import InlineEdit from 'react-edit-inline';
import HostQuestion from './hostQuestion.jsx';
import ResponseTypeDropDown from './responseTypeDropDown.jsx';
import ResponseField from './responseField.jsx';
import MultipleChoiceBuilder from './multipleChoice/multipleChoiceBuilder.jsx';

class Prompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promptText: 'Insert question or prompt text',
      responseTypes: [{type: "Multiple Choice", selected: false}, {type: "Raw text", selected: false}],
      choices: [{choice: "hi", correctAnswer: false}],
      trackAnswers: false
    }
  }
  saveSettingsHandler(){
    //should log editted prompt data object
    console.log(this.state);
  }

  createChoice(choice) {
    this.state.choices.push({
      choice: choice,
      correctAnswer: false
    });
    this.setState({ choices: this.state.choices })
  }

  toggleTrackAnswerStatus() {
    this.state.trackAnswers = !this.state.trackAnswers;
  }

  render() {
    return (
      <div className="prompt">
        <h3>Prompt</h3>
        <HostQuestion promptText={this.state.promptText}/>
        <ResponseTypeDropDown responseTypes={this.state.responseTypes} />
        <br></br>
        <br></br>
        <MultipleChoiceBuilder correctAnswerExists={this.state.correctAnswerExists}
        createChoice={this.createChoice.bind(this)}
        choices={this.state.choices}/>
        <br></br>
        <br></br>
        
        <button onClick={this.saveSettingsHandler.bind(this)}>Confirm prompt settings</button>
      </div>
    )
  }
}
export default Prompt;