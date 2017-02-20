import React, { Component, PropTypes } from 'react';
import styles from './EditorMain.css';
import $ from 'jquery';
// import Editor from './editor/editor.jsx';
import NeoPrompt from './editor/neoPrompt.jsx';
import PromptCount from './editor/promptCount.jsx';

class EditorMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomData: "hi",
      prompts: []
    }
    this.updatePromptField = this.updatePromptField.bind(this);
    this.setRoomTitle = this.setRoomTitle.bind(this);
  }

  updatePromptField(update, index) {
    let newArray = this.state.prompts.slice();
    newArray[index] = update;
    this.setState({prompts: newArray})
  }

  renderPrompts() {
    // pass promptTemplate down as props to each prompt?
      // if individual prompt changes, set the state back at editor level to reflect that change 
    const listOfPrompts = this.state.prompts.map((prompt, index) => <NeoPrompt key={index} index={index} updatePromptField={this.updatePromptField}/>);
    return listOfPrompts;
  }

  removePrompt() {
    //this should remove the selected prompt
  }

  setRoomTitle() {

  }

// if change to +1 only button, consider the concat option from http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
  addPrompt() {
    console.log('adding another prompt');
    let newArray = this.state.prompts.slice();
    newArray.push(this.state.promptTemplate);
    this.setState({prompts: newArray}) ;
    console.log('this.state is', this.state)
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
        <Editor />
        <form>
          <label>Room name:</label>
            <input type="text" placeholder="Set a room name" size="30" />
        </form>
        <PromptCount addPrompt={this.addPrompt.bind(this)} /> 
        <h2>Settings</h2>   
        {this.renderPrompts()}
        <button onClick={this.createRoom.bind(this)}>Create Room with Fake Data</button>
      </div>
    );
  }
}

export default EditorMain;
