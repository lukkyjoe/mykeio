import React from 'react';
import $ from 'jquery';
import Host from './host/host-main.jsx';
import Client from './client/client-main.jsx';
class Room extends React.Component{
  constructor(props){
    super(props);
    this.state={loading:true};
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

      })
  }

  render(){
    if (this.state.loading){
      return <p>Joining room...</p>
    } else {
      if (this.state.isAdmin){
        return <Host roomId={this.roomid} />
      }else {
        return <Client roomId={this.roomid}/>
      }
    }
  }
}

export default Room;
