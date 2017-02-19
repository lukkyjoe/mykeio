import React, { Component, PropTypes } from 'react';
import styles from './HostMain.css';
import $ from 'jquery';

import Question from './Question.jsx';

class HostMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingUp:true,
      clients:[],
      questions:[]
    }
    this.connectionHash = {};
    this.setUpRoom = this.setUpRoom.bind(this);
    this.sendPrompt = this.sendPrompt.bind(this);
  }

  componentDidMount() {
    this.setUpRoom();
  }

  setUpRoom() {
    this.peer = new Peer({
      host:'/',
      port:9000,
      debug:2
    });
    this.peer.on('open', (id)=>{
      this.setState({peerid:id});
      $.post('/api/updateHost', {roomid: this.props.params.roomid, peerid: id})
        .done(()=>{
          console.log('host data updated');
        })
        .fail((data)=>{
          console.log('could not update host data');
        });
    });

    this.peer.on('connection', (conn)=>{
      console.log('connection event =====' , conn);
      console.log('this.connection hash =====' , this.connectionHash)
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
      })
    });

    $.get('/api/getRoom', {roomid: this.props.params.roomid})
      .done((data)=>{
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

  sendPrompt(event) {
    for (let connection in this.connectionHash) {
      console.log(this.connectionHash[connection]);
      this.connectionHash[connection].send({type: 'INITIATE_PROMPT', payload: "insert target value x"})
    }
  }

  render() {
    console.log(this.stream);
    let users = this.state.clients.map(a=><p>{a.id}</p>);
    let questions = this.state.questions.map(a=><Question connection={a.connection} host={this.state.peerid}/>);
    console.log('questions length ', questions.length);
    return (
      <div className={styles.base}>
        <a href={'/#/' + this.props.params.roomid}>go to client</a>
        {[...users]}
        <p>questions</p>
        {[...questions]}
<<<<<<< HEAD
=======
        <button onClick={this.sendPrompt}> send question </button>
>>>>>>> 8f25bf3d4f5b2b74d29a4428da1c0aea3a4db8eb
      </div>
    );
  }
}

export default HostMain;
