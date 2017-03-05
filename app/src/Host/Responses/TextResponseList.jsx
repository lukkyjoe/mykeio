import React from 'react';
import styles from './ResponsesView.css';


const TextResponseList = ({textResponsesDisplay}) => {
  const textResponseList = textResponsesDisplay.map((response, index) => {
    return (
      <div key={index}>
        <div className={styles.username}>{response.username}:</div>
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