import React, { Component, PropTypes } from 'react';
import styles from './HostMain.css';
import $ from 'jquery';


class HostMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingUp:true,
      clients:[]
    }
    this.connectionHash = {};
    this.setUpRoom = this.setUpRoom.bind(this);
  }

  componentDidMount() {
    this.setUpRoom();
  }

  setUpRoom() {
    this.peer = new Peer({key: 'lwjd5qra8257b9'});

    this.peer.on('open', (id)=>{
      $.post('/api/updateHost', {roomid: this.props.params.roomid, peerid: id})
        .done(()=>{
          console.log('host data updated');
        })
        .fail((data)=>{
          console.log('could not update host data');
        });
    });

    this.peer.on('connection', (conn)=>{
      conn.on('data', (data)=>{
        this.handlePeerData(data, conn);
      });
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
    } 

    case 'CANCEL_QUESTION_REQUEST': {
      this.setState({questions: this.removeFromList(this.state.questions, a => a.id === data.payload.id)});
    }

    }
  }
  //pure, returns new array
  removeFromList(list, selectionFunction ) {
    let newList = list.slice();
    newList.splice(newList.findIndex(selectionFunction(a)), 1);
    return newList;

  }

  addToList(list, item) {
    return [...list, item];
  }

  updateItemInList(list, selectionFunction, itemToAdd) {
    let newList = list.slice();
    newList.splice(newList.findIndex(selectionFunction(a)), 1, itemToAdd);
    return newList;
  }

  render() {
    let users = this.state.clients.map(a=><p>{a.id}</p>);
    return (
      <div className={styles.base}>
        <a href={'/#/' + this.props.params.roomid}>go to client</a>
        {[...users]}
        <p>questions</p>
      </div>
    );
  }
}

export default HostMain;
