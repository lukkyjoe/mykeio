import React from 'react';
import Question from '../client/question.jsx';


class Queue extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.questions[0]){
      console.log('rendering questions',this.props);
      return this.props.questions.map((value, index, array)=>(Question(value.user.username)));
    }else{
      return <div></div>
    }
  }
}

export default Queue;
