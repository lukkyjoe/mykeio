import React from 'react';
import InlineEdit from 'react-edit-inline';

class HostQuestion extends React.Component {

  handleUpdateClick(event) {
    event.preventDefault();
    this.props.updatePrompt(this.refs.promptInput.value);
  }

  render() {
    return (
      <div className="hostQuestion">
        <form onSubmit={this.handleUpdateClick.bind(this)}>
         Prompt: <textarea name="myTextarea" ref="promptInput" placeholder="Leave a comment." cols="60" rows="6" required onChange={this.handleUpdateClick.bind(this)}></textarea>
        </form>
      </div>
    );
  }
}

export default HostQuestion;