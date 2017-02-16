import React from 'react';

class ResponseTypeDropDown extends React.Component {

  handleClick(event) {
    console.log(event);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h3>Select the audience response type</h3>
        <h4>Currently selected response type: <i>{this.props.responseTypes[0].type}</i></h4>
        <ul title="Response types">
          <li onClick={this.handleClick}>{this.props.responseTypes[0].type}</li>
          <li>{this.props.responseTypes[1].type}</li>
        </ul>
      </div>

    )
  }
}

export default ResponseTypeDropDown;