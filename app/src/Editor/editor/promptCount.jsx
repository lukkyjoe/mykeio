import React, { Component } from 'react';

class PromptCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promptNumber: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({promptNumber: event.target.value});
  //   console.log(this.state.promptNumber)
  //   console.log(this.props.testNumber)
  // }

  handleSubmit(event) {
    event.preventDefault();
    console.log('hanldesubmit', this.refs.promptCount.value);
    this.props.updatePromptNumber(this.refs.promptCount.value);

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            How Many Prompts?:
            <input type="text" value={this.state.value} ref="promptCount" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default PromptCount;