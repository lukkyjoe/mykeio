import React from 'react';
import $ from 'jquery';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  joinRoom(event) {
    event.preventDefault();

    $.get('/api/room/info/' + this.state.value)
      .done(() => {
        console.log('room found!');
        window.location.href = '/#/' + this.state.value;
      })
      .fail(() => {
        console.log('THIS IS THE STATE', this.state.value);
        console.log('room does not exist!');
        this.setState({value: ''});
      });
  }

  createNewRoom() {
    $.get('/api/room/new')
      .done((data)=>{
        window.location.href = '#/' + data.id;
      })
      .fail(()=>{
        console.log('room creation failed');
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.createNewRoom}>Create New Room</button>
        <br /><br /><br /><br />
        <form onSubmit={this.joinRoom}>
        <label>
          Join Room:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>

    );
  }
}

export default Main;
