import React from 'react';

class GiveFeedbackBoolean extends React.Component {

  handleClick(event) {
<<<<<<< HEAD
    console.log('target value ====', event.currentTarget.value)
=======
    console.log(event);
    console.log(this.props);
    console.log('target value ====', event.currentTarget.value);
>>>>>>> 82f8607dfd8febc7d0b0a1e651b03b70487b6d6d
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