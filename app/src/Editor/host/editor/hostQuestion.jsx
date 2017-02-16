import React from 'react';
import InlineEdit from 'react-edit-inline';

class HostQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      question: this.props.promptText,
    }
    this.questionChanged = this.questionChanged.bind(this);
  }

  questionChanged(data) {
  // data = { description: "New validated text comes here" } 
  // Update your model from here 
    this.setState({question: data.message})
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
      <div className="hostQuestion">
        <span> Question/Prompt: </span>
          <InlineEdit
            activeClassName="editing"
            text={this.state.question}
            paramName="message"
            change={this.questionChanged}
            style={inlineEditStyle}
          />
      </div>
    );
  }
}

export default HostQuestion;