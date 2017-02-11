import React from 'react';
import Question from '';

const Queue = ({ questions = []},onAnswer,onCancel) => {
  const queue = questions
    .map((question, index) => 
      (<Question key={index}
      name={question.user.username}
      onAnswer={onAnswer}
      onCancel={onCancel}
      />)
    );
  return (
    <div>{queue}</div>  
  )
};

export default Queue;
