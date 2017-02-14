import React from 'react';
import QAPair from './qaPair.jsx';

const QAPairQueue = ({ pairs = []}) => {
  const pairsList = pairs
    .map((pair, index) => 
      (<QAPair key={index}
      question={pair.question}
      answer={pair.answer}
      />)
    );
  return (
    <div>{pairsList}</div>  
  )
};

export default QAPairQueue;