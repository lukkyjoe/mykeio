import React from 'react';
import styles from './ResponsesView.css';


const TextResponseList = ({textResponsesDisplay}) => {
  const textResponseList = textResponsesDisplay.map((response, index) => {
    return (
      <div className={styles.textResponseCard} key={index}>
        <div className={styles.textResponseText}>{response.username}{textResponsesDisplay[0].message === 'No responses submitted yet...' ? '' : ':'}</div>
        <div>{response.message}</div>
      </div>
    );
  });
  
  return (
    <div className={styles.responsesView}>
      {textResponseList}
    </div>
  );
};

export default TextResponseList;