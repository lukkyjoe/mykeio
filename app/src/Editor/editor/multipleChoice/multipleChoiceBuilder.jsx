import React from 'react';
import ChoicesList from './choicesList.jsx';
import CreateItem from './createItem.jsx';

export default class MultipleChoiceBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: this.props.choices
    };
  }
  render() {
    return (
      <div>
        <CreateItem createChoice={this.props.createChoice}/>
        <ChoicesList 
          choices={this.state.choices}
          createChoice={this.props.createChoice}
          saveChoice={this.props.saveChoice}
          deleteChoice={this.props.deleteChoice}
          selectAsCorrect={this.props.selectAsCorrect}
          />
      </div>
    );
  }
}
