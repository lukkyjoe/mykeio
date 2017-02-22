import React from 'react';
import styles from './ResponseTally.css';

const ResponseTally = ({response, index}) => {
  
  return (
    <tr className={styles.responseTally}>
      <td>
        {response.choice}
      </td>
      <td>
        {response.tally}
      </td>
    </tr>
  )
}

export default ResponseTally;