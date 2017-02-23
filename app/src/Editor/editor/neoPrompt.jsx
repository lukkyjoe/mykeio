import React from 'react';
import styles from './neoPrompt.css';
import HostQuestion from './hostQuestion.jsx';
import ResponseTypeSelect from './responseTypeSelect.jsx';
import ResponseField from './responseField.jsx';
import MultipleChoiceBuilder from './multipleChoice/multipleChoiceBuilder.jsx';
import GiveFeedbackBoolean from './giveFeedbackBoolean.jsx';

class NeoPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: 'Here is a scary example question',
      responseType: 'none',
      choices: [],
      trackAnswers: false,
      giveFeedback: false
    };
  }
  // saveSettingsHandler() {
  //   //should log editted prompt data object
  //   console.log(this.state);
  // }

  updatePrompt(text) {
    this.state.promptText = text;
    this.setState({ choices: this.state.choices });
    console.log(this.props.index);
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

  toggleGiveFeedbackStatus(status) {
    console.log('toggleGiveFeedback status =========', status);
    this.setState({ giveFeedback: !!this.state.giveFeedback });
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

  render() {  
    return (
      <div className={styles.promptContainer}>
          <button className={styles.alignRight} onClick={this.props.deletePrompt}>Delete</button>
        <HostQuestion promptText={this.state.promptText} updatePrompt={this.updatePrompt.bind(this)}/>
        <ResponseTypeSelect responseType={this.state.responseType} selectResponseType={this.selectResponseType.bind(this)}/>
        {this.renderResponseFormat()}
        <br></br>
        <GiveFeedbackBoolean toggleGiveFeedbackStatus={this.toggleGiveFeedbackStatus.bind(this)}/>
      </div>
    );
  }
}
export default NeoPrompt;