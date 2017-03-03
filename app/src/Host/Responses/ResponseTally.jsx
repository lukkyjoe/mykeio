import React from 'react';
import styles from './ResponseTally.css';

const ResponseTally = ({response, index}) => {
  
  return (
    <div className={styles.responseTally}>
      <div>
        {response.choice}
      </div>
      <div>
        {response.tally}
      </div>
    </div>
  )
}

export default ResponseTally;