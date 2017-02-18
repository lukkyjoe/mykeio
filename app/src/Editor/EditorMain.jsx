import React, { Component, PropTypes } from 'react';
import styles from './EditorMain.css';
import $ from 'jquery';
import Editor from './editor/editor.jsx';
class EditorMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      roomData: {}
    }
=======
      roomTitle: ''
    };
>>>>>>> many small changes
  }

  createRoom() {
    $.post('/api/createRoom', {
      roomTitle: 'A v hella dank room.',
      feedback: [ 
        {
          type: 'MULTIPLE_CHOICE',
          prompt: 'WHAT IS LOVE?',
          trackAnsweres: false,
          giveFeedback: true,
          options: [
            {
              text: 'baby dont hurt me',
              isCorrect: true
            },
            {
              text: 'dont hurt me',
              isCorrect: true
            },
            {
              text: 'no more',
              isCorrect: true
            },
          ]
        },
        {
          type: 'TEXT',
          prompt: 'This one time at band camp you:'
        }
      ]
    }
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
        <input />
        <button onClick={this.createRoom}>Create Room with Fake Data</button>
      </div>
    );
  }
}

export default EditorMain;
