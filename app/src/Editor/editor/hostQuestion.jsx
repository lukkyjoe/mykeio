import React from 'react';
import InlineEdit from 'react-edit-inline';

class HostQuestion extends React.Component {

  handleUpdateClick(event) {
    event.preventDefault;
    console.log(this.refs.promptInput.value);
    this.props.updatePrompt(this.refs.promptInput.value);
  }

  render() {
    return (
      <div className="hostQuestion">
        <span> Question/Prompt: </span>
        <span> <i> {this.props.promptText} </i> </span>
        <form>
          <input type="text" placeholder={this.props.promptText} ref="promptInput" size="60"/>
          <button onClick={this.handleUpdateClick.bind(this)}> Update </button>
        </form>
      </div>
    );
  }
}

export default HostQuestion;