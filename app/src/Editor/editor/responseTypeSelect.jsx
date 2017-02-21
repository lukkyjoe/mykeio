import React from 'react';

class ResponseTypeSelect extends React.Component {

  handleClick(event) {
    console.log(event);
    console.log(this.props);
    this.props.selectResponseType(event.currentTarget.value);
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label>
              <input type="radio" name="foo" value="MULTIPLE_CHOICE" onChange={this.handleClick.bind(this)} />
              Multiple choice
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="foo" value="TEXT" onChange={this.handleClick.bind(this)}/>
              Text
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default ResponseTypeSelect;