import React, { Component, PropTypes } from 'react';
import styles from './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.base}>
        <a href='/#/editor'>Create Room</a>
      </div>
    );
  }
}

export default Home;
