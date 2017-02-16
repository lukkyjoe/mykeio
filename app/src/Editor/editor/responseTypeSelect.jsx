import React from 'react';

class ResponseTypeSelect extends React.Component {

  handleClick(event) {
    console.log(event);
    event.preventDefault();
  }
  render() {
    return (
      /*<div>
        <h3>Select the participant response type</h3>
        <h4>Currently selected response type: <i>{this.props.responseTypes[0].type}</i></h4>
        <form>
          <div>
            <label>
              <input type="radio" value="MULTIPLE_CHOICE" />
              Multiple choice
            </label>
          </div>
          <div>
            <label>
              <input type="radio" value="TEXT" />
              Text
            </label>
          </div>
        </form>
      </div>*/

    <table>
      <tbody>
          <tr>
              <td>
                MULTIPLE_CHOICE
                <input type="radio" name="FOONAME" value="FOO"/>
              </td>
          </tr>
          <tr>
              <td>
                TEXT
                <input type="radio" name="FOONAME" value="FOO"/>
              </td>
          </tr>
      </tbody>
    </table>

    )
  }
}

export default ResponseTypeSelect;