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
     this.peer.on('open', function(id) {
      $.post('/api/updateHost/'+ props.roomId,{peerID:id})
        .done()
        .fail((data)=>{
          console.log('could not update host data');
        })
    });
  }

  render() {
    return (
      <div className={styles.base}>
        
      </div>
    );
  }
}

export default HostMain;
