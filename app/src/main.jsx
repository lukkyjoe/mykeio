import React from 'react';
import $ from 'jquery';

class Main extends React.Component{

  createNewRoom(){
    $.get('/api/room/new');
  }

  render(){
    return (
      <div>
        <button onClick={this.createNewRoom}>Create New Room</button>
      </div>
    )
  }
}

export default Main;
