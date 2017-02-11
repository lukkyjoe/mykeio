import React from 'react';

const Question = function(props){
  return (
    <div>
      <h3>Question From: {name}</h3>
      <button onClick={onAnswer}>Answer</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default Question;

