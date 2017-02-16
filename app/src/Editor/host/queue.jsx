import React from 'react';
import Question from '../client/question.jsx';

const Queue = ({ questions = []}) => {
  const queue = questions
    .map((question, index) => 
      (<Question key={index}
      question={question.question}
      username={question.username}
      />)
    );
  return (
    <div>{queue}</div>  
  )
};

export default Queue;