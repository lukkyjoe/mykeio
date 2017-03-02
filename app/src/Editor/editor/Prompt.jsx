import React from 'react';
import styles from './Prompt.css';
import HostQuestion from './hostQuestion.jsx';
import ResponseTypeSelect from './responseTypeSelect.jsx';
import MultipleChoiceBuilder from './multipleChoice/multipleChoiceBuilder.jsx';
import GiveFeedbackBoolean from './giveFeedbackBoolean.jsx';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: '',
      responseType: 'TEXT',
      choices: [],
      giveFeedback: false
    };
  }

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

  deleteChoice(indexToDelete) {
    // take this chance to prevent mutation!
    let newChoicesArray = this.state.choices.slice();
    _.remove(newChoicesArray, choice => choice === newChoicesArray[indexToDelete]);
    this.setState({choices: newChoicesArray});
    this.props.updatePromptField(this.state, this.props.index);
  }

  selectAsCorrect(target) {
    const foundChoice = _.find(this.state.choices, choice => choice.choice === target);
    foundChoice.correctAnswer = !foundChoice.correctAnswer;
    this.setState({choices: this.state.choices });
    this.props.updatePromptField(this.state, this.props.index);
    console.log(foundChoice);
  }

  toggleGiveFeedbackStatus() {
    var temp = this.state.giveFeedback;
    var newFeedback = !temp;
    console.log('set ', newFeedback);
    this.setState({ giveFeedback: newFeedback }, ()=>{
      console.log('data bound state', this.state);
      this.props.updatePromptField(this.state, this.props.index);
    }); 
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

  }

  render() {  
    return (
      <div className={styles.promptContainer}>
        <HostQuestion promptText={this.state.promptText} updatePrompt={this.updatePrompt.bind(this)}/>
        <ResponseTypeSelect responseType={this.state.responseType} selectResponseType={this.selectResponseType.bind(this)}/>
        {this.renderResponseFormat()}
        <br></br>
        {this.state.responseType === 'MULTIPLE_CHOICE' ? <GiveFeedbackBoolean toggleGiveFeedbackStatus={this.toggleGiveFeedbackStatus.bind(this)}/> : undefined }
        <button className={styles.deleteButton} onClick={this.props.deletePrompt}>&#10007;</button>
      </div>
    );
  }
}
export default Prompt;