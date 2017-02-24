import React, { Component, PropTypes } from 'react';
import styles from './ClientMain.css';
import $ from 'jquery';
import _ from 'lodash';

import VolumeBar from './VolumeBar.jsx';
import FeedbackMain from './feedback/FeedbackMain.jsx';


class ClientMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: 'connecting to server...',
      hasVoiceQuestion: false,
      userNameIsSet: false,
      isReady: false,
      clientData: {
        username: 'Anonymous',
      },
      quizId: undefined,
      showAnswer: false
    };

    this.renderPrompt = this.renderPrompt.bind(this);
  }

  connectToHost(e) {
    e.preventDefault();
    $.get('/api/getRoom', {roomid: this.props.params.roomid})
      .done((data)=>{
        console.log(data);
        this.setState({status: 'connecting to host....'});
        this.setState(data);
        this.peer = new Peer({
          host: '/',
          port: 9000,
          debug: 2
        });

        this.peer.on('open', (id)=>{
          this.state.clientData.id = id;
          this.connection = this.peer.connect(this.state.adminPeerId);
          this.connection.on('open', ()=>{
            this.setState({status: 'connected to host.'});
            this.updateHostWithClientData();
            let that = this;
            navigator.getUserMedia({audio: true, video: false}, (stream)=>{
              that.setState({hasMedia: true, stream: stream});
            }, ()=>{
              that.setState({hasMedia: false});
            });
          });
          this.connection.on('data', this.handleHostData.bind(this));
        });
      }).fail(()=>{
        this.setState({status: 'Could not connect to the server'});
      });

    window.onbeforeunload = ()=>{ 
      this.send('CLIENT_DISCONNECT');
    };
    this.setState({isReady: true});
  }

  handleHostData(data) {
    switch (data.type) {
    case 'ANSWER_REQUEST': {
      this.dispatchCall(data.payload);
      break;
    }
    case 'QUESTION_CANCEL': {
      if (this.state.hasVoiceQuestion === true) {
        this.setState({hasVoiceQuestion: false});
        this.mediaConnection.close();
      }
      break;
    }    
    case 'START_FEEDBACK': {
      console.log('THIS THE DATA PAYLOADBRUUHHH', data.payload);
      this.renderQuestions(data.payload);
      break;
    } 
    }
  }

  renderQuestions(targetId) {
    var target = _.find(this.state.prompts, (item) => {
      return item.uuid === targetId;
    });
    this.setState({feedback: target}, () => {
      console.log('LETS GO', this.state.feedback);
    });
  }

  dispatchCall(hostid) {
    this.mediaConnection = this.peer.call(hostid, this.state.stream);
    this.setState({showAudio: true});
    let that = this;
    this.mediaConnection.on('close', () =>{
      that.setState({showAudio: false});
    });
  }

  updateHostWithClientData() {
    this.send('CLIENT_UPDATE');
  }

  askVoiceQuestion() {
    this.send('QUESTION_REQUEST');
    this.setState({hasVoiceQuestion: true});
  }

  cancelVoiceQuestion() {
    this.send('CANCEL_QUESTION_REQUEST');
    this.setState({hasVoiceQuestion: false});
    if (this.mediaConnection) {
      this.mediaConnection.close();
    }
  }

  send(type, data = this.state.clientData) {
    this.connection.send({ type: type,
      payload: data
    });
  }

  handleQuestionClick() {
    if (this.state.hasVoiceQuestion) {
      this.cancelVoiceQuestion();
    } else {
      this.askVoiceQuestion();
    }
  }

  renderPrompt() {
    this.setState({feedback: undefined});
    
  }

  handleUsernameInput(e) {
    this.setState({clientData: Object.assign({}, this.state.clientData, {username: e.target.value})}); 
  }

  render() {
    if (!this.state.isReady) {
      return (
        <div className={styles.usernameContainer}>
          <form onSubmit={this.connectToHost.bind(this)}>
            Username:<input type='text' onChange={this.handleUsernameInput.bind(this)}/>
            <button onClick={this.connectToHost.bind(this)}>Connect to host</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className={styles.base}>
          <p>{this.state.status}</p>
          <h2>{this.state.roomTitle}</h2>
          {this.state.feedback ? <FeedbackMain renderPrompt={this.renderPrompt} peerid={this.state.clientData.id} connection={this.connection} feedback={this.state.feedback}/> : undefined}
          {this.state.showAudio ? <VolumeBar/> : undefined}
          {this.state.showAnswer ? this.state.correctAnswer : undefined}
          <button onClick={this.handleQuestionClick.bind(this)}>{this.state.hasVoiceQuestion ? 'Cancel Question' : 'Ask Question'}</button>
        </div>
      );
    }
  }
}

export default ClientMain;