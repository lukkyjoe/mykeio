import React from 'react';
import $ from 'jquery';
class Host extends React.Component{
  constructor(props){
    super(props);
    var peer = new Peer({key: 'lwjd5qra8257b9'});
    peer.on('open', function(id) {
      $.post('/api/room/updateHostPeer/'+ props.roomId)
        .done((data)=>{
          console.log('room admin peer update successful');
        }).fail((data)=>{
          console.log('room admin peer update unsucsessful')
        })
    });
  }
  render(){
    return <p>this is the host view</p>
  }
}

export default Host;
