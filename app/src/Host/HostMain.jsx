import React, { Component, PropTypes } from 'react';
import styles from './HostMain.css';
import $ from 'jquery';
import ResponsesView from './Responses/ResponsesView.jsx';
import Question from './Question.jsx';
import Feedback from './Feedback.jsx';

class HostMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingUp: true,
      clients: [],
      questions: [],
      promptDisplay: []
    };
    this.connectionHash = {};
    this.setUpRoom = this.setUpRoom.bind(this);
  }

  componentDidMount() {
    this.setUpRoom();
  }

  setUpRoom() {
    this.peer = new Peer({
      host: '/',
      port: 9000,
      debug: 2
    });
    this.peer.on('open', (id)=>{
      this.setState({peerid: id});
      $.post('/api/updateHost', {roomid: this.props.params.roomid, peerid: id})
        .done(()=>{
          console.log('host data updated');
        })
        .fail((data)=>{
          console.log('could not update host data');
        });
    });

    this.peer.on('connection', (conn)=>{
      console.log('connection event =====', conn);
      console.log('this.connection hash =====', this.connectionHash);
      //somewhere here is a good place to add to connectionHash
      //client.id not what you're looking for? client ids create the connection
      // use the connections
      conn.on('data', (data)=>{
        this.handlePeerData(data, conn);
      });
    });

    this.peer.on('call', (call)=>{
      console.log('recieving call');
      call.answer();
      call.on('stream', (mediaStream)=>{
        let clientAudio = new Audio(window.URL.createObjectURL(mediaStream));
        clientAudio.play();
      });
    });

    $.get('/api/getRoom', {roomid: this.props.params.roomid})
      .done((data)=>{
        console.log('THIS IS THE DATA', data);
        this.setState({roomData: data});
      })
      .fail(()=>{
      });

  }

  handlePeerData(data, conn) {
    switch (data.type) {
    case 'CLIENT_UPDATE': {
        let currentList = this.state.clients.slice();
        if (currentList.find(a=>a.id === data.payload.id)) {
          this.setState({clients: this.updateItemInList(this.state.clients, a=>a.id === data.payload.id, data.payload)});
        } else {
          this.setState({clients: this.addToList(this.state.clients, data.payload)});
          this.connectionHash[data.payload.id] = conn;
        }
        break;
      }
    case 'CLIENT_DISCONNECT': {
        this.setState({clients: this.removeFromList(this.state.clients, a=> a.id === data.payload.id)});
        this.setState({questions: this.removeFromList(this.state.questions, a=> a.id === data.payload.id)});
        this.connectionHash[data.payload.id] = undefined;
        break;
      }

    case 'QUESTION_REQUEST': {
        data.payload.connection = conn;
        this.setState({questions: this.addToList(this.state.questions, data.payload)});
        break;
      } 

    case 'CANCEL_QUESTION_REQUEST': {
        this.setState({questions: this.removeFromList(this.state.questions, a => a.id === data.payload.id)});
        break;
      }

    case 'FEEDBACK_RESPONSE': {
      let newArray = this.state.roomData.prompts.slice();
      let targetIndex = _.findIndex(newArray, 
      (prompt) => prompt.uuid === data.payload.quizuuid);
      newArray[targetIndex].choices[data.payload.index].tally = newArray[targetIndex].choices[data.payload.index].tally + 1;
      let newRoomData = Object.assign({}, this.state.roomData);
      newRoomData.prompts = newArray;
      this.setState({roomData: newRoomData
      });
      break;
    }

    }
  }
  //pure, returns new array
  removeFromList(list, selectionFunction ) {
    let newList = list.slice();
    newList.splice(newList.findIndex(selectionFunction), 1);
    return newList;
  }

  addToList(list, item) {
    return [...list, item];
  }

  updateItemInList(list, selectionFunction, itemToAdd) {
    let newList = list.slice();
    newList.splice(newList.findIndex(selectionFunction), 1, itemToAdd);
    return newList;
  }
  onCancelQuestion(peerid) {
    this.setState({questions: this.state.questions.filter((a)=>a.id !== peerid)});
    this.connectionHash[peerid].send({
      type: 'QUESTION_CANCEL',
      payload: peerid
    });
  }

  selectPrompt(text) {
    let target = _.find(this.state.roomData.prompts, function(prompt) {
      return prompt.uuid === text;
    });
    console.log('find the target prompts arr of choices', target.choices);
    console.log('find the target', target);
    //WARNING: MUTATION IS HAPPENING HERE. dangerous!
    if (!target.choices[0].hasOwnProperty('tally')){
      target.choices.forEach((choice) => choice.tally = 0);
    }
    //may have to expand this to include more
    //problem: switching between prompts overwrites the object that holds the prompt tallies
    this.setState({promptDisplay: target.choices});
  }

  render() {
    let questions = this.state.questions.map((a, index)=> (<Question key={index} onCancelQuestion={this.onCancelQuestion.bind(this)} user={a} connection={a.connection} host={this.state.peerid}/>));
    let feedback = [];
    if (this.state.roomData) {
      if (this.state.roomData.prompts) {
        feedback = this.state.roomData.prompts.map((a, index) => (<Feedback key={a.uuid} uuid={a.uuid} 
      connections={this.connectionHash} clients={this.state.clients}
      promptText={a.promptText} selectPrompt={this.selectPrompt.bind(this)} />));
      }
    }
    return (
      <div className={styles.base}>
        <div className={styles.questionContainer}>
          <a href={'/#/' + this.props.params.roomid}>go to client</a>
          <p>questions</p>
          {[...questions]}
        </div>
        <ResponsesView displayData={this.state.promptDisplay}/>
        <div className={styles.feedbackContainer}>
          {[...feedback]}
        </div>
      </div>
    );
  }
}

export default HostMain;
