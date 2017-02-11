import React from 'react';
import Queue from './queue.jsx';
import $ from 'jquery';
class Host extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      clients:[],
      questions:[]
    }

    this.userHash = {};

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
      this.userHash[data.user.client_id] = data.user;
      this.setState({clients:newClients},()=>{
        console.log("clients updated ", this.state.clients);
      });
    }
    if (data.type === 'question'){

      if (data.active){
        const newQuestions = this.state.clients.slice();
        let user = this.userHash[data.client_id];

        newQuestions.push({
          user:user
        });

        this.setState({questions:newQuestions});

      } else {

        const newQuestions = this.state.clients.slice();
        let user = this.userHash[data.client_id];

        newQuestions.forEach((question, index, array)=>{
          if (question.user.client_id === data.client_id){
            array.splice(index,1);
          }
        });

        this.setState({questions:newQuestions});
      }
    }
  }

  render(){
    return 
    (
      <div>
        <p>this is the host view</p>
        <Queue questions={this.state.questions}/>
      </div>
    )
  }
}

export default Host;
