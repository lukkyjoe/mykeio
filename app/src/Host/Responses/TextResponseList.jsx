import React from 'react';
import styles from './ResponsesView.css';


const TextResponseList = ({textResponsesDisplay}) => {
  
  const textResponseList = textResponsesDisplay.map((response, index) => {
    return (
      <div>
        <div>{response.username} </div>
        <div>{response.message} </div>
      </div>
    )
  })

  checkResponseLength() {
    if (textResponsesDisplay.length < 1) {
      return (
        <div>No responses have been submitted yet</div>
      )
    } else {
      return textResponseList;
    }
  }

  return (
    <div>
      <table className={styles.responsesView}>
        <tbody>
          {this.checkResponseLength.bind(this)}
        </tbody>
      </table>
    </div>
  )
}

export default TextResponseList;