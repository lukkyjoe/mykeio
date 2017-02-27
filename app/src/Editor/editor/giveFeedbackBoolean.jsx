import React from 'react';

class GiveFeedbackBoolean extends React.Component {

  handleClick() {
    this.props.toggleGiveFeedbackStatus();
  }

  render() {
    return (
      <div>
        <form>
          <div>
              <input type="checkbox" onChange={() => { this.handleClick(); }}/>
              Give Feedback to Audience
          </div>   
        </form>
      </div>
    );
  }
}

export default GiveFeedbackBoolean;