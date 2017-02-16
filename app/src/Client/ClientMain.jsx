import React, { Component, PropTypes } from 'react';
import styles from './ClientMain.css';
import $ from 'jquery';
import VolumeBar from './VolumeBar.jsx';
class ClientMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: 'connecting to server...',
      isReady: false,
      clientData: {
        username: 'Anonymous',
      }
    };

  }

  componentDidMount() {
    $.get('/api/getRoom', {roomid: this.props.params.roomid})
      .done((data)=>{
        console.log(data);
        this.setState({status: 'connecting to host....'});
        this.setState(data);
        this.peer = new Peer({key: 'lwjd5qra8257b9'});

        this.peer.on('open', (id)=>{
          this.state.clientData.id = id;
          this.connection = this.peer.connect(this.state.adminPeerId);
          this.connection.on('open', ()=>{
            this.setState({status: 'connected to host.'});
            this.updateHostWithClientData();
          });
        });
      }).fail(()=>{
        this.setState({status: 'Could not connect to the server'});
      });

    window.onbeforeunload = ()=>{ 
      console.log(this.peer);
      this.connection.send({type: 'CLIENT_DISCONNECT', payload: this.state.clientData});
    };
  }

  updateHostWithClientData() {
    this.connection.send({
      type: 'CLIENT_UPDATE',
      payload: this.state.clientData
    });
  }

  askVoiceQuestion() {
    this.connection.send({
      type: 'QUESTION_REQUEST',
      payload: this.state.clientData
    });
    this.setState({hasVoiceQuestion: true});
  }

  cancelVoiceQuestion() {
    this.connection.send({
      type: 'CANCEL_QUESTION_REQUEST',
      payload: this.state.clientData
    });
    this.setState({hasVoiceQuestion: false});

  }
  render() {
    return (
      <div className={styles.base}>
        <p>{this.state.status}</p>
        <h2>{this.state.roomTitle}</h2>
        <button onClick={this.askVoiceQuestion}>Ask Question</button>
        <VolumeBar />
      </div>
    );
  }
}

export default ClientMain;
