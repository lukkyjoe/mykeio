import React from 'react';
import ReactDom from 'react-dom';

console.log('sup!');

const SessionList = ({ sessions = []}) => {
  const sessionList = sessions
    .map((session, index) => 
      (<Session key={index}
      host={session.host}
      title={session.title}
      quizzes={session.quizzes}
      />)
    );
  return (
    <div>{sessionList}</div>  
  )
};

const Session = ({host, title, quizzes}) => {
  render() {
    return (
      <div>
        <span>Session List</span>
        <span>{title}</span>
      </div>
      
      )
  }
}

export default SessionList;
