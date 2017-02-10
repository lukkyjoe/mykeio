import React from 'react';
import $ from 'jquery';

class Main extends React.Component {

  createNewRoom() {
    $.get('/api/room/new')
      .done((data)=>{
        window.location.href = '#/' + data.id;
      })
      .fail(()=>{
        console.log('room creation failed');
      });
  }

  joinRoom(e) {
    e.preventDefault();
    console.log(e);
    
  }
  render() {
    return (
      <div>
        <button onClick={this.createNewRoom}>Create New Room</button>
        <br />
        <form onSubmit={this.joinRoom}>
          <input placeholder="Join Room"/>
          <button>Join</button>
        </form>
      </div>

    );
  }
}

export default Main;
