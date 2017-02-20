import React from 'react';
import HostQuestion from './hostQuestion.jsx';
import ResponseTypeSelect from './responseTypeSelect.jsx';
import ResponseField from './responseField.jsx';
import MultipleChoiceBuilder from './multipleChoice/multipleChoiceBuilder.jsx';
import TrackAnswersBoolean from './trackAnswersBoolean.jsx';
import GiveFeedbackBoolean from './giveFeedbackBoolean.jsx';

class NeoPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: 'Here is a scary example question',
      responseType: 'none',
      choices: [{choice: 'dummy choice', correctAnswer: false}],
      trackAnswers: false,
      giveFeedback: false
    };
  }
  saveSettingsHandler() {
    //should log editted prompt data object
    console.log('BY NOW YOU SHOULD BE PASSING THE ARRAY OF PROMPT DATA, NOT JUST INDIVIDUALS');
  }

  updatePrompt(text) {
    this.state.promptText = text;
    this.setState({ choices: this.state.choices });
    console.log(this.props.index)
    //try updating the parent editor's state using the index props and updatePromptInArray function props
    this.props.updatePromptField(this.state, this.props.index);

  }

  createChoice(choice) {
    this.state.choices.push({
      choice: choice,
      correctAnswer: false
    });
    this.setState({ choices: this.state.choices });
    this.props.updatePromptField(this.state, this.props.index);
  }

  saveChoice(oldChoice, newChoice) {
    const foundChoice = _.find(this.state.choices, choice => choice.choice === oldChoice);
    console.log('saveChoice method foundchoice', foundChoice);
    foundChoice.choice = newChoice;
    this.setState({choices: this.state.choices });
    this.props.updatePromptField(this.state, this.props.index);
  }

  deleteChoice(choiceToDelete) {
    _.remove(this.state.choices, choice => choice.choice === choiceToDelete);
    this.setState({choices: this.state.choices});
    this.props.updatePromptField(this.state, this.props.index);
  }

  selectAsCorrect(target) {
    const foundChoice = _.find(this.state.choices, choice => choice.choice === target);
    console.log(foundChoice);
    foundChoice.correctAnswer = !foundChoice.correctAnswer;
    this.setState({choices: this.state.choices });
    this.props.updatePromptField(this.state, this.props.index);
  }

  toggleTrackAnswerStatus(status) {
    this.state.trackAnswers = status;
    this.setState({ trackAnswers: this.state.trackAnswers });
    this.props.updatePromptField(this.state, this.props.index);
  }

  toggleGiveFeedbackStatus(status) {
    console.log('toggleGiveFeedback status =========', status);
    this.state.giveFeedback = status;
    this.setState({ giveFeedback: this.state.giveFeedback });
    this.props.updatePromptField(this.state, this.props.index);
  }

  selectResponseType(text) {
    this.state.responseType = text;
    this.setState({ responseType: this.state.responseType });
    this.props.updatePromptField(this.state, this.props.index);
  }

  renderResponseFormat() {
    if (this.state.responseType === 'MULTIPLE_CHOICE') {
      return (
        <MultipleChoiceBuilder updatePromptField={this.props.updatePromptField}
        index={this.props.index}
        createChoice={this.createChoice.bind(this)}
        saveChoice={this.saveChoice.bind(this)}
        deleteChoice={this.deleteChoice.bind(this)}
        selectAsCorrect={this.selectAsCorrect.bind(this)}
        choices={this.state.choices}/>
      );
    }
    if (this.state.responseType === 'TEXT') {
      return (
        <div> Raw input field </div>
      );
    }
  }

  renderGiveFeedbackSection() {
    if (this.state.trackAnswers === 'true') {
      return (
        <GiveFeedbackBoolean toggleGiveFeedbackStatus={this.toggleGiveFeedbackStatus.bind(this)}/>
      );
    } else {
      return;
    }
  }


  render() {  
    return (
      <div className="prompt">
        <h3>Prompt #{this.props.index+1}</h3>
        <HostQuestion promptText={this.state.promptText} updatePrompt={this.updatePrompt.bind(this)}/>
        <ResponseTypeSelect responseType={this.state.responseType} selectResponseType={this.selectResponseType.bind(this)}/>
        {this.renderResponseFormat()}
        <TrackAnswersBoolean trackAnswers={this.state.trackAnswers} toggleTrackAnswerStatus={this.toggleTrackAnswerStatus.bind(this)}/>
        <br></br>
        {this.renderGiveFeedbackSection()}        
        <button onClick={this.saveSettingsHandler.bind(this)}>Confirm prompt settings</button>

      </div>
    );
  }
}
export default NeoPrompt;