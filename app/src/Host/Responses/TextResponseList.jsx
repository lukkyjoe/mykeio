import React from 'react';
import styles from './ResponsesView.css';


const TextResponseList = ({textResponses}) => {
  const textResponseList = textResponses.map((response, index) => {
    return (
      <div>
        <div>{response.username} </div>
        <div>{response.message} </div>
      </div>
    )
  })
  
  return (
    <div>
      <table className={styles.responsesView}>
        <tbody>
          {textResponseList}
        </tbody>
      </table>
    </div>
  )
}

export default TextResponseList;