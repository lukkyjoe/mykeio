import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class SessionEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A quiz question was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }  

  render() {
    return (
      <div>
        <h2>Edit your session!</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Quiz name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Save changes" />
        </form>
      </div>
    )
  }
}

export default SessionEditor;

//remove when not testing
ReactDOM.render(<SessionEditor />, document.getElementById('app'));