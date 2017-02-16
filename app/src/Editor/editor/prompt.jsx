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
      promptText: 'Here is a scary example question',
      responseType: '',
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
    this.setState({ choices: this.state.choices });
  }

  updatePrompt(text) {
    this.state.promptText = text;
    this.setState({ choices: this.state.choices });

  }

  toggleTrackAnswerStatus() {
    this.state.trackAnswers = !this.state.trackAnswers;
  }

  selectResponseType(text) {
    this.state.responseType = text;
    this.setState({ choices: this.state.choices });
  }

  render() {
    return (
      <div className="prompt">
        <h3>Prompt</h3>
        <HostQuestion promptText={this.state.promptText} updatePrompt={this.updatePrompt.bind(this)}/>
        <ResponseTypeDropDown responseTypes={this.state.responseTypes} selectResponseType={this.selectResponseType.bind(this)}/>
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