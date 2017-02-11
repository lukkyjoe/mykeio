import React from 'react';
import $ from 'jquery';
class Host extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      clients:[],
      questions:[]
    }

    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    this.peer.on('open', function(id) {
      $.post('/api/room/updateHostPeer/'+ props.roomId,{peerID:id})
        .done()
        .fail((data)=>{
          console.log('could not update host data');
        })
    });

    this.peer.on('connection', (conn)=>{
      conn.on('data', (data)=>{
        this.handlePeerData(data);
      });
    });
  }


  handlePeerData(data){
    if (data.type === "init"){
      const newClients = this.state.clients.slice();
      newClients.push(data.user);
      this.setState({clients:newClients},()=>{
        console.log("clients updated ", this.state.clients);
      });
    }
  }
  render(){
    return <p>this is the host view</p>
  }
}

export default Host;
