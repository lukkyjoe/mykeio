import React, { Component, PropTypes } from 'react';
import styles from './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {roomName: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({roomName: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    window.location.href = '/#/' + this.state.roomName;
  }
 
  render() {
    return (
      <div> 
        <div className={styles.base}>
          <a href='/#/editor'>Create Room</a>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Join Room" />
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
