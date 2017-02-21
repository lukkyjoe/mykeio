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
        <span> Question/Prompt: </span>
        <span> <i> {this.props.promptText} </i> </span>
        <form>
          <input type="text"   ref="promptInput" size="60" onChange={this.handleUpdateClick.bind(this)}/>
        </form>
      </div>
    );
  }
}

export default HostQuestion;