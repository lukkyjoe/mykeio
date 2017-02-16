import React from 'react';
// import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Button , MenuItem, DropdownButton } from 'react-bootstrap';

class ResponseTypeDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  render() {
    return (
      <div>
        <h3>Select the audience response type</h3>
        <DropdownButton id="responseTypeDropdown" title="Response types">
          <MenuItem eventKey="1">{this.props.responseTypes[0].type}</MenuItem>
          <MenuItem eventKey="2">{this.props.responseTypes[1].type}</MenuItem>
        </DropdownButton>
      </div>

    )
  }
}

export default ResponseTypeDropDown;