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
            let that = this;
            navigator.getUserMedia({audio:true, video:false},(stream)=>{
              that.setState({hasMedia:true})
            }, ()=>{
              that.setState({hasMedia:false});
            })
          })
        })
      }).fail(()=>{
        this.setState({status: 'Could not connect to the server'});
      });

    window.onbeforeunload = ()=>{ 
      this.send('CLIENT_DISCONNECT');
    }
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
