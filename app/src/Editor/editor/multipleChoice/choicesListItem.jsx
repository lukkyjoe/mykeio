import React from 'react';
import styles from './choicesListItem.css';

export default class ChoicesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }
  
  renderChoiceSection() {
    const {choice } = this.props;

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={choice} ref="editInput" />
          </form>
        </td>
      );
    }
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    }
    return (
        <td>
          <button onClick={this.onEditClick.bind(this)}>&#10000;</button>
          <button onClick={this.props.deleteChoice.bind(this, this.props.choice)}>&#10007;</button>
          <input type="checkbox" onChange={this.onChangeTest.bind(this)} className={styles.checkboxwarning}/>
        </td>
    );
  }
  render() {
    return (
        <tr className={styles.itemStyle}>
          <td>{this.props.choice}</td>
          {this.renderChoiceSection()}
          {this.renderActionsSection()}
        </tr>
    );
  }
  onEditClick() {
    this.setState({ isEditing: true });
  }
  onCancelClick() {
    this.setState({ isEditing: false});
  }
  onSaveClick(event) {
    event.preventDefault();
    const oldChoice = this.props.choice;
    const newChoice = this.refs.editInput.value;
    this.props.saveChoice(oldChoice, newChoice);
    this.setState({isEditing: false});
  }

  onSelectAsCorrectClick(event) {
    event.preventDefault();
    const target = this.props.choice;
    this.props.selectAsCorrect(target);
  }

  onChangeTest(event) {
    this.props.selectAsCorrect(this.props.choice);
  }
}