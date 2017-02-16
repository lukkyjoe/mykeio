import React from 'react';

class TrackAnswersBoolean extends React.Component {

  handleClick(event) {
    console.log(event);
    console.log(this.props);
    console.log('target value ====', event.currentTarget.value)
    this.props.toggleTrackAnswerStatus(event.currentTarget.value);
  }
  render() {
    return (
      <div>
        <h3>Track answers? {this.props.trackAnswers}</h3>
        <form>
          <div>
            <label>
              <input type="radio" name="foo" value={true} onChange={this.handleClick.bind(this)} />
              Track answers
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="foo" value={false} onChange={this.handleClick.bind(this)}/>
              Do NOT track answers
            </label>
          </div>
        </form>
      </div>
    )
  }
}

export default TrackAnswersBoolean;