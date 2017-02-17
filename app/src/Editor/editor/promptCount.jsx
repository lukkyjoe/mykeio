import React, { Component } from 'react';

class PromptCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promptNumber: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({promptNumber: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            How Many Prompts?:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PromptCount;