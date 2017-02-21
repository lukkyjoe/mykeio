import React from 'react';

class GiveFeedbackBoolean extends React.Component {

  handleClick(event) {
    this.props.toggleGiveFeedbackStatus(event.currentTarget.value);
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label>
              <input type="radio" name="foo" value={true} onChange={this.handleClick.bind(this)} />
              Give immediate feedback
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="foo" value={false} onChange={this.handleClick.bind(this)}/>
              Do NOT give immediate feedback
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default GiveFeedbackBoolean;