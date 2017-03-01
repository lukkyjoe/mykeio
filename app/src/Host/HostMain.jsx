import React, { Component, PropTypes } from 'react';
import styles from './HostMain.css';
import $ from 'jquery';
import ResponsesView from './Responses/ResponsesView.jsx';
import Question from './Question.jsx';
import Feedback from './Feedback.jsx';
import TextResponseList from './Responses/TextResponseList.jsx';

class HostMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingUp: true,
      clients: [],
      questions: [],
      promptDisplay: [],
      responseType: '',
      textResponses: [{dummyQuizID: [{username: 'a', message: 'fee'}, {username: 'b', message: 'fi'}]},],
      textResponsesDisplay: [],
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
      console.log('data when feedback comes through', data);
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

    case 'TEXT_RESPONSE': {
      console.log('text response data', data);
      let newArray = this.state.textResponses.slice();
      //there may be responses from different quizzes, so save them in different objects
      //first, find the array that corresponds
      let target = _.find(newArray, (collection) => collection.hasOwnProperty(data.payload.quizuuid));
      console.log('target ========', target);
      let targetIndex = _.findIndex(newArray, (collection) => collection.hasOwnProperty(data.payload.quizuuid));
      console.log('targetIndex ====', targetIndex);
      let dummyTarget = _.find(newArray, (collection) => collection.hasOwnProperty('dummyQuizID'));
      console.log('dummyTarget', dummyTarget);
      if (target === undefined) {
        let textResponsesCollection = {};
        textResponsesCollection[data.payload.quizuuid] = [{username: data.payload.clientData.username, message: data.payload.textResponse}];
        console.log('new quiz collection=======', textResponsesCollection)
        newArray.push(textResponsesCollection);
        this.setState(
          {
            textResponses: newArray, 
            textResponsesDisplay: textResponsesCollection[data.payload.quizuuid],

          });
      } else {
        newArray[targetIndex][data.payload.quizuuid].push({username: data.payload.clientData.username, message: data.payload.textResponse});
        this.setState(
          {
            textResponses: newArray,
            textResponsesDisplay: newArray[targetIndex][data.payload.quizuuid],
          });
      }

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
    //note to self: refactor so the below doesn't mutate
    if (target.responseType === 'MULTIPLE_CHOICE') {
      if (!target.choices[0].hasOwnProperty('tally')) {
        target.choices.forEach((choice) => choice.tally = 0);
      }
      this.setState({responseType: 'MULTIPLE_CHOICE'});
      this.setState({promptDisplay: target.choices}); 
    }
    if (target.responseType === 'TEXT') {
      let targetCollection = _.find(this.state.textResponses, (collection) => collection.hasOwnProperty(text));
      if (targetCollection != undefined) {
        this.setState(
          {
            responseType: 'TEXT',
            textResponsesDisplay: targetCollection[text],
          });
      }
    }

  }

  renderList() {
    if (this.state.responseType === 'MULTIPLE_CHOICE') {
      return (
        <ResponsesView displayData={this.state.promptDisplay}/>
      );
    } else if (this.state.responseType === 'TEXT') {
      return (
          <TextResponseList textResponsesDisplay={this.state.textResponsesDisplay}/>
      );
    }  
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
        <div className={styles.topBar}>
          <p className={styles.title}>{this.state.roomData ? this.state.roomData.roomTitle : 'connecting...'}</p>
          <p className={styles.counter}>{this.state.clients.length + ' clients connected'}</p>
        </div>
        <div className={styles.contentMain}>
          <div className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <p className={styles.questionText}>Questions</p>
            </div>
            <a href={'/#/' + this.props.params.roomid}>go to client</a>
            {[...questions]}
          </div>
          {this.renderList()}
          <div className={styles.feedbackContainer}>
            {[...feedback]}
          </div>
        </div>
      </div>
    );
  }
}

export default HostMain;
