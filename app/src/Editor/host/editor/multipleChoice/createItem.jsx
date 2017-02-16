import React from 'react';


export default class CreateItem extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="Insert a multiple choice answer" ref="createInput"/>
        <button>Create</button>
      </form>
    )
  }
  handleCreate(event) {
    event.preventDefault;
    console.log(this.refs.createInput.value);
    this.props.createChoice(this.refs.createInput.value);
    this.refs.createInput.value = '';
  }
}