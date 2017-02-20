import React from 'react';
import ChoicesList from './choicesList.jsx';
import CreateItem from './createItem.jsx';

export default class MultipleChoiceBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choices: this.props.choices
    };
  }
  render() {
    return (
      <div>
        <h3>Create your multiple choice items</h3>
        <CreateItem createChoice={this.props.createChoice}/>
        <ChoicesList 
          choices={this.state.choices}
          createChoice={this.props.createChoice}
          saveChoice={this.props.saveChoice}
          deleteChoice={this.props.deleteChoice}
          selectAsCorrect={this.props.selectAsCorrect}
          />
      </div>
    )
  }

  // saveChoice(oldChoice, newChoice) {
  //   const foundChoice = _.find(this.state.choices, choice => choice.choice === oldChoice);
  //   console.log('saveChoice method foundchoice', foundChoice);
  //   foundChoice.choice = newChoice;
  //   this.setState({choices: this.state.choices });
  // }

  // deleteChoice(choiceToDelete) {
  //   _.remove(this.state.choices, choice => choice.choice === choiceToDelete);
  //   this.setState({choices: this.state.choices});
  // }

  // selectAsCorrect(target) {
  //   const foundChoice = _.find(this.state.choices, choice => choice.choice === target);
  //   console.log(foundChoice);
  //   foundChoice.correctAnswer = !foundChoice.correctAnswer;
  //   this.setState({choices: this.state.choices });
  // }
}