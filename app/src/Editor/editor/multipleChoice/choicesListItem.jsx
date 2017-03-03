import React from 'react';
import styles from './choicesListItem.css';

export default class ChoicesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isCorrect: false
    };
  }
  
  renderChoiceSection() {
    const {choice } = this.props;

    if (this.state.isEditing) {
      return (
        <div>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={choice} ref="editInput" />
          </form>
        </div>
      );
    }
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </div>
      );
    }
    return (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={this.onEditClick.bind(this)}>&#10000;</button>
          <button className={styles.button}onClick={this.props.deleteChoice.bind(this, this.props.index)}>&#10007;</button>
          <button  onClick={this.onChangeTest.bind(this)} className={styles.correctButton}>{this.state.isCorrect?"Correct":"Incorrect"}</button>
        </div>
    );
  }
  render() {
    return (
        <div className={styles.itemStyle}>
          <div className={styles.text}>{this.props.choice}</div>
          {this.renderChoiceSection()}
          {this.renderActionsSection()}
        </div>
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
    this.setState({isCorrect:!this.state.isCorrect});
    this.props.selectAsCorrect(this.props.choice);
  }
}
