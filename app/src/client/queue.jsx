import React from 'react';
import Question from './question.jsx';

const Queue = ({ questions = [] }) => {
  const queue = questions
    .map(question => 
      (<Question 
      question={question.question}
      username={question.username}
      />)
    );
  return (
    <div>{queue}</div>  
  )
};

export default Queue;