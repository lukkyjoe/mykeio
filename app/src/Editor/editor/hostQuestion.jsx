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
         Title: <input placeholder="Title Required" ref="promptInput" required onChange={this.handleUpdateClick.bind(this)}></input>
         <p></p>
         {/*add tiny MCE, THIS TEXT ARE DOESNT GO ANYWHERE YET*/}
         Body: <textarea name="myTextarea" placeholder="Explain your prompt. (optional)" cols="40" rows="10"></textarea>
        </form>
      </div>
    );
  }
}

export default HostQuestion;