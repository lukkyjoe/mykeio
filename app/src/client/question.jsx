import React from 'react';

const Question = (props) =>
  <div className="question">
    <ul>
      <div className="questionText">{props.question}</div>
      <button>Accept</button>
      <button>Reject</button>
    </ul>
  </div>
  ;
export default Question;