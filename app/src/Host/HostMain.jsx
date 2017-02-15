import React, { Component, PropTypes } from 'react';
import styles from './HostMain.css';
import $ from "jquery";

class HostMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingUp:true
    }
    this.setUpRoom = this.setUpRoom.bind(this);
  }

  componentDidMount() {
    this.setUpRoom();
  }

  setUpRoom(){
    this.peer = new Peer({key: 'lwjd5qra8257b9'});

    this.peer.on('open', (id)=>{
      $.post('/api/updateHost', {roomid:this.props.params.roomid, peerid:id})
        .done(()=>{
          console.log('host data updated');
        })
        .fail((data)=>{
          console.log('could not update host data');
        })
    });

    this.peer.on('connection',(conn)=>{
      conn.on('data',(data)=>{
        this.handlePeerData(data);
      })
    })

    $.get('/api/getRoom', {roomid:this.props.params.roomid})
      .done((data)=>{
        console.log(data);
      })
      .fail(()=>{
        console.log('could not get room data');
      })
  }

  handlePeerData(data){
    console.log(data);
  }

  render() {
    return (
      <div className={styles.base}>
        
      </div>
    );
  }
}

export default HostMain;
