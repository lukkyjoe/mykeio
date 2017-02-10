import React from 'react';
import Question from './question.jsx';

const Queue = (props) => (
  <div className="queue">
    {props.questions.map((question, index) => <Question key={index} question={question} />)}
  </div>
);

export default Queue;