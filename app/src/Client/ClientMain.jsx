import React, { Component, PropTypes } from 'react';
import styles from './ClientMain.css';
import $ from 'jquery';
class ClientMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status:"connecting to server...",
      isReady:false
    }
  }

  componentDidMount() {
    $.get('/api/getRoom', {roomid:this.props.params.roomid})
      .done((data)=>{
        this.setState({status:"connecting to host...."});
        console.log(data);
      }).fail(()=>{
        this.setState({status:"Could not connect to the server"});
      })
  }

  render() {
    return (
      <div className={styles.base}>
        
      </div>
    );
  }
}

export default ClientMain;
