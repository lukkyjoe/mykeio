import React from 'react';
import $ from 'jquery';
class Host extends React.Component{
  constructor(props){
    super(props);
    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    this.peer.on('open', function(id) {
      $.post('/api/room/updateHostPeer/'+ props.roomId,{peerID:id})
        .done(()=>{
          console.log('admin peer list updated');
        }).fail((data)=>{
          console.log('room admin peer update unsucsessful')
        })
    });

    this.peer.on('connection', function(conn) {
      console.log('peer connected');
      this.conn.on('data', function(data){
        console.log(data);
      });
    });
  }
  render(){
    return <p>this is the host view</p>
  }
}

export default Host;
