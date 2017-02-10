import React from 'react';
import $ from 'jquery';
import Host from './host/host.jsx';
import Client from './client/client.jsx';
class Room extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      roomFound:true,
    };
  }



  componentDidMount(){
    this.url = window.location.href;
    this.roomid = this.url.substr(this.url.length - 6, 6);
    $.get('/api/room/info/'+ this.roomid)
      .done((data)=>{
        this.setState({
          isAdmin:data.isAdmin,
          loading:false
        });
      }).fail((er)=>{
        this.setState({
          roomFound:false,
          loading:false
        });
      })
  }

  render(){
    if (this.state.loading){
      return <p>Joining room...</p>
    } else {
      if (this.state.roomFound){
        if (this.state.isAdmin){
          return <Host roomId={this.roomid} />
        }else {
          return <Client roomId={this.roomid}/>
        }
      }else{
        return <h1>The room could not be found</h1>
      }
    }
  }
}

export default Room;
