import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class SessionEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>Edit your session!</h2>
        <form>Quiz form</form>
      </div>
    )
  }
}

export default SessionEditor;

//remove when not testing
ReactDOM.render(<SessionEditor />, document.getElementById('app'));