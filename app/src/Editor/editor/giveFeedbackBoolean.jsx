import React from 'react';
import styles from './hostQuestion.css';

class GiveFeedbackBoolean extends React.Component {

  handleClick() {
    this.props.toggleGiveFeedbackStatus();
  }

  render() {
    return (
      <div>
        <form>
          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input className={styles.checkbox} type="checkbox" onChange={() => { this.handleClick(); }}/>
              Give feedback to audience
            </label>
          </div>   
        </form>
      </div>
    );
  }
}

export default GiveFeedbackBoolean;