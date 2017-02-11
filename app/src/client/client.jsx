import React from 'react';
import $ from 'jquery';
export const DEFAULT_TEXT = 'Ask question';
export const CLICKED_TEXT = 'Cancel';

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raisedHand: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.createPeerConnection = this.createPeerConnection.bind(this);

    $.get('/api/room/info/'+props.roomId)
      .done((data)=>{
        console.log(data);
        this.createPeerConnection(data.adminPeerId);
      })
      .fail(()=>{
        console.log('could not get room info');
      })

  }

  handleClick() {
    this.setState(() => ({
      raisedHand: !this.state.raisedHand
    }));
    this.conn
    
  }

  createPeerConnection(host_id){
    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    const peer = this.peer;
    this.peer.on('open',(client_id) => {
      this.conn = this.peer.connect(host_id);
      this.conn.on('open',()=>{
        this.conn.send({
          type:'init',
          user:{
            client_id:client_id,
            username:'Anonymous'
          }
        })
      })
    })
  }

  render() {
    return (
      <button onClick={this.handleClick}>{this.state.raisedHand ? CLICKED_TEXT : DEFAULT_TEXT}</button>
    );
  }
}

export default Client;
