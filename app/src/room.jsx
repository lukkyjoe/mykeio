import React from 'react';
import $ from 'jquery';

class Room extends React.Component{

  componentDidMount(){
    const url = window.location.href;
    const roomid = url.substr(url.length - 6, 6);
    console.log(roomid);
    $.get('/api/room/info/'+ roomid)
      .done((data)=>{
       console.log(data);
      })
  }
  render(){
    return (
      <p>This is the room Component</p>
    )
  }
}

export default Room;
