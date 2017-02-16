import React from 'react';
import InlineEdit from 'react-edit-inline';
import HostQuestion from './hostQuestion.jsx';
import ResponseTypeSelect from './responseTypeSelect.jsx';
import ResponseField from './responseField.jsx';
import MultipleChoiceBuilder from './multipleChoice/multipleChoiceBuilder.jsx';
import TrackAnswersAndFeedbackBoolean from './trackAnswersAndFeedbackBoolean.jsx';

const foo = 'bar';

class Prompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promptText: 'Here is a scary example question',
      responseType: 'none',
      choices: [{choice: 'dummy choice', correctAnswer: false}],
      trackAnswers: false,
      giveFeedback: false
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

  toggleTrackAnswerStatus(status) {
    this.state.trackAnswers = status
    this.setState({ trackAnswers: this.state.trackAnswers });
  }

  selectResponseType(text) {
    this.state.responseType = text;
    this.setState({ responseType: this.state.responseType });
  }

  renderResponseFormat() {
    if (this.state.responseType === 'MULTIPLE_CHOICE') {
      return (
        <MultipleChoiceBuilder correctAnswerExists={this.state.correctAnswerExists}
        createChoice={this.createChoice.bind(this)}
        choices={this.state.choices}/>
      )
    }
    if (this.state.responseType === 'TEXT') {
      return (
        <div> Raw input field </div>
      )
    }
  }

  renderGiveFeedbackSection() {
    if (this.state.trackAnswers === "true") {
      return (
        <div> Give feedback? </div>
      )
    }
    else {
      return;
    }

  }


  render() {
    return (
      <div className="prompt">
        <h3>Prompt</h3>
        <HostQuestion promptText={this.state.promptText} updatePrompt={this.updatePrompt.bind(this)}/>
        <ResponseTypeSelect responseType={this.state.responseType} selectResponseType={this.selectResponseType.bind(this)}/>
        <br></br>
        <br></br>
        <MultipleChoiceBuilder correctAnswerExists={this.state.correctAnswerExists}
        createChoice={this.createChoice.bind(this)}
        choices={this.state.choices}/>
        <TrackAnswersAndFeedbackBoolean trackAnswers={this.state.trackAnswers} toggleTrackAnswerStatus={this.toggleTrackAnswerStatus.bind(this)}/>
        
        <br></br>
        <br></br>
        {this.renderGiveFeedbackSection()}        
        <button onClick={this.saveSettingsHandler.bind(this)}>Confirm prompt settings</button>

      </div>
    )
  }
}
export default Prompt;