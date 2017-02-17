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
        this.peer = new Peer({
          key: 'r8qpysu90fu8r529',
          secure:true,
          config:{ 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] },
          debug:0
        });

        this.peer.on('open', (id)=>{
          this.state.clientData.id = id;
          this.connection = this.peer.connect(this.state.adminPeerId);

          this.connection.on('open', ()=>{
            this.setState({status: 'connected to host.'});
            this.updateHostWithClientData();
            let that = this;
            navigator.getUserMedia({audio:true, video:false},(stream)=>{
              that.setState({hasMedia:true, stream:stream});
            }, ()=>{
              that.setState({hasMedia:false});
            });
          });

          this.connection.on('data',this.handleHostData.bind(this));


        })
      }).fail(()=>{
        this.setState({status: 'Could not connect to the server'});
      });

    window.onbeforeunload = ()=>{ 
      this.send('CLIENT_DISCONNECT');
    }
  }

  handleHostData(data){
    switch (data.type){
      case "ANSWER_REQUEST":{
        this.dispatchCall(data.payload);
        break;
      }
    }
  }

  dispatchCall(hostid){
    this.peer.call(hostid, this.state.stream);
  }


  updateHostWithClientData(){
    this.send('CLIENT_UPDATE');
  }

  askVoiceQuestion(){
    this.send('QUESTION_REQUEST');
    this.setState({hasVoiceQuestion:true});
  }

  cancelVoiceQuestion(){
    this.send('CANCEL_QUESTION_REQUEST');
    this.setState({hasVoiceQuestion:false});
  }

  send(type, data=this.state.clientData){
    this.connection.send({ type:type,
      payload:data
    })
  }

  handleQuestionClick(){
    if (this.state.hasVoiceQuestion){
      this.cancelVoiceQuestion();
    } else {
      this.askVoiceQuestion();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <p>{this.state.status}</p>
        <h2>{this.state.roomTitle}</h2>
        <VolumeBar />
        <button onClick={this.handleQuestionClick.bind(this)}>{this.state.hasVoiceQuestion?"Cancel Question":"Ask Question"}</button>
      </div>
    );
  }
}

export default ClientMain;
