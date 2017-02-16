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

    $.get('/api/getRoom', {roomid:this.props.params.roomid})
      .done((data)=>{
        this.setState({roomData:data});
      })
      .fail(()=>{
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
          });
        } else {
          this.setState({clients:[...this.state.clients, data.payload]},()=>{
          })
        }
        break;
      }
      case "CLIENT_DISCONNECT":{
        let currentList = this.state.clients.slice();
        currentList.splice(currentList.findIndex(a=>a.id === data.payload.id),1);
        this.setState({clients:currentList},()=>{
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
        <p>questions</p>
      </div>
    );
  }
}

export default HostMain;
