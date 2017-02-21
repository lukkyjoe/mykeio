import React, { Component, PropTypes } from 'react';
import styles from './EditorMain.css';
import $ from 'jquery';
import NeoPrompt from './editor/neoPrompt.jsx';
import PromptCount from './editor/promptCount.jsx';
import ShortID from 'shortid';

class EditorMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomTitle: 'New Room',
      promptTemplate: 
      {
        promptText: 'Here is a scary example question',
        responseType: 'none',
        choices: [{choice: 'dummy choice', correctAnswer: false}],
        trackAnswers: false,
        giveFeedback: false
      }, 
      prompts: []
    };
    this.updatePromptField = this.updatePromptField.bind(this);
    this.setRoomTitle = this.setRoomTitle.bind(this);
    this.deletePrompt = this.deletePrompt.bind(this);
  }

  deletePrompt(index) {
    let temp = this.state.prompts.slice();
    temp.splice(index, 1);
    this.setState({prompts: temp}, function() {
      console.log(this.state.prompts);
    });
  }

  updatePromptField(update, index) {
    let newArray = this.state.prompts.slice();
    newArray[index] = Object.assign({ uuid: newArray[index].uuid }, update);
    this.setState({prompts: newArray});
  }

  renderPrompts() {
    // pass promptTemplate down as props to each prompt?
      // if individual prompt changes, set the state back at editor level to reflect that change 
    const listOfPrompts = this.state.prompts.map((prompt, index) => <NeoPrompt 
          deletePrompt={() => this.deletePrompt(index)} 
          key={prompt.uuid} 
          index={index} 
          updatePromptField={this.updatePromptField} />);
    return listOfPrompts;
  }

  removePrompt() {
    //this should remove the selected prompt
  }

  setRoomTitle() {

  }

// if change to +1 only button, consider the concat option from http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
  addPrompt() {
    let newArray = this.state.prompts.slice();
    var newPrompt = Object.assign({uuid: ShortID.generate()}, this.state.promptTemplate);
    newArray.push(newPrompt);
    this.setState({prompts: newArray});
  }

  createRoom() {
    console.log('HERE IS THE ROOM DATA', this.state);
    $.post('/api/createRoom', this.state
  )
      .done((data)=>{
        window.location.href = '/#/host/' + data;
      }).fail((data)=>{
        console.log(data);
      });
  }

  render() {
    return (
      <div className={styles.base}>
        <form>
          <label>Room name:</label>
            <input type="text" placeholder="Set a room name" size="30" />
        </form>
        <PromptCount addPrompt={this.addPrompt.bind(this)}/> 
        <h2>Settings</h2>   
        {this.renderPrompts()}
        <button onClick={this.createRoom.bind(this)}>Create Room with Fake Data</button>
      </div>
    );
  }
}

export default EditorMain;
