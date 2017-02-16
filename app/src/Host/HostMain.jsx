import React, { Component, PropTypes } from 'react';
import styles from './HostMain.css';
import $ from "jquery";

class HostMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingUp:true,
      clients:[]
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
        });
    });

    this.peer.on('connection',(conn)=>{
      conn.on('data',(data)=>{
        this.handlePeerData(data);
      })
    })

    this.peer.on('close', (hello)=>{
      console.log('peer closed');
      console.log(hello);
    })

    $.get('/api/getRoom', {roomid:this.props.params.roomid})
      .done((data)=>{
        this.setState({roomData:data});
      })
      .fail(()=>{
        console.log('could not get room data');
      })
  }

  handlePeerData(data){
    console.log(data);
    switch (data.type){
      case "CLIENT_UPDATE":{
        let currentList = this.state.clients.slice();
        if (currentList.find(a=>a.id === data.payload.id)){
          currentList.splice(currentList.findIndex(a=>a.id === data.payload.id), 1, data.payload);
          this.setState({clients:currentList},()=>{
            console.log('client updated', this.state.clients)
          });
        } else {
          this.setState({clients:[...this.state.clients, data.payload]},()=>{
            console.log("client added", this.state.clients);
          })
        }
        break;
      }
      case "CLIENT_DISCONNECT":{
        let currentList = this.state.clients.slice();
        currentList.splice(currentList.findIndex(a=>a.id === data.payload.id),1);
        this.setState({clients:currentList},()=>{
          console.log("client diconnected", this.state.clients);
        });
        break;
      }
    }
  }

  render() {
    let users = this.state.clients.map(a=><p>{a.id}</p>);
    return (
      <div className={styles.base}>
        <a href={'/#/' + this.props.params.roomid}>go to client</a>
        {[...users]}
      </div>
    );
  }
}

export default HostMain;
