import React from 'react';
import InlineEdit from 'react-edit-inline';

class QAPair extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: 'here is a question',
      answer: 'here is an answer',
    }
    this.questionChanged = this.questionChanged.bind(this);
    this.answerChanged = this.answerChanged.bind(this);
  }

  questionChanged(data) {
  // data = { description: "New validated text comes here" } 
  // Update your model from here 
    this.setState({question: data.message})
    console.log(data);
  }
  answerChanged(data) {
  // data = { description: "New validated text comes here" } 
  // Update your model from here 
    this.setState({answer: data.message})
    console.log(data);
  }

  
  render() {
    const inlineEditStyle = {
      backgroundColor: 'yellow',
      minWidth: 150,
      display: 'inline-block',
      margin: 0,
      padding: 0,
      fontSize: 15,
      outline: 0,
      border: 0
    }
    return (
      <div className="qaPair">
        <span>Question: </span>
            <InlineEdit
              activeClassName="editing"
              text={this.props.question}
              paramName="message"
              change={this.dataChanged}
              style={inlineEditStyle}
            />
        <span>Answer: </span>
            <InlineEdit
              activeClassName="editing"
              text={this.props.answer}
              paramName="message"
              change={this.dataChanged}
              style={inlineEditStyle}
            />            
        <br></br>
      </div>
    )
  }
}
export default QAPair;