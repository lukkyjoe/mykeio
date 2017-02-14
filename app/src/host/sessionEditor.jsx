import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import QAPairQueue from './qaPairQueue.jsx';

class SessionEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorObj: {
        questionAndAnswers: [
          {
            question: 'QLorem ipsum dolor sit amet, consectetur adipiscing elit.',
            answer: 'AInteger nec odio.'
          }, 
          {
            question: 'QPraesent libero.',
            answer: 'ASed cursus ante dapibus diam.'
          }, 
          {
            question: 'QMorbi in dui quis est pulvinar ullamcorper. ',
            answer: 'AVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere'
          },          
        ]
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log("this should eventually save changes")
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Edit your quiz.</h2>    
        <form onSubmit={this.handleSubmit}>
            <h3>Click to edit the questions and answers.</h3>
            <QAPairQueue pairs={this.state.editorObj.questionAndAnswers}/>
          <br></br>
          <input type="submit" value="Save changes" />
        </form>                  
      </div>
    )
  }
}

export default SessionEditor;

//remove when not testing
ReactDOM.render(<SessionEditor />, document.getElementById('app'));