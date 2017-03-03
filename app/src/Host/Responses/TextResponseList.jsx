import React from 'react';
import styles from './ResponsesView.css';


const TextResponseList = ({textResponsesDisplay}) => {
  const textResponseList = textResponsesDisplay.map((response, index) => {
    return (
      <div key={index}>
        <div>{response.username}</div>
        <div>{response.message}</div>
      </div>
    );
  });
  
  return (
    <div>
          {textResponseList}
    </div>
  );
};

export default TextResponseList;