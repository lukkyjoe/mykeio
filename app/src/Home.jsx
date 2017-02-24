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

  onCreateRoom() {
    window.location.href = '/#/editor';
  }

  render() {
    return (
      <div> 
        <div className={styles.dev}>
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
        <div className={styles.splashMain}>
          <div className={styles.headerMain}>
            <h2 className={styles.logo}>myke.io</h2>
            <h3 className={styles.subhead}>Fast, realtime feedback engine for teachers and presenters</h3>
            <div className={styles.create} onClick={this.onCreateRoom}>
              <p className={styles.createText}>Create Room</p>
            </div>
            <img src='./img/quiz.svg' className={styles.connectionImage}/>
            <h3 className={styles.subhead}>Send out quizes and questionnaires and get realtime answers</h3>

            <img src='./img/quest.svg' className={styles.connectionImage}/>
            <h3 className={styles.subhead}>Crowd members can ask questions straight from their phone, all audio is streamed to the hosts computer with ultra low latency.</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
