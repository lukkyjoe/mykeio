import React from 'react';
import styles from './responseTypeSelect.css';

class ResponseTypeSelect extends React.Component {


  handleClick(event) {
    console.log(event);
    console.log(this.props);
    this.props.selectResponseType(event.currentTarget.getAttribute('type'));
  }
  render() {
    return (
      <div>
        <form>
          <div className={styles.textOrMultipleChoice}>
            <div type="MULTIPLE_CHOICE" onClick={this.handleClick.bind(this)} className={styles.multButton}>
              <p className={styles.buttonText}>Multiple choice</p>
            </div>
            <div type="TEXT" onClick={this.handleClick.bind(this)} className={styles.multButton}>
              <p className={styles.buttonText}>Short answer</p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ResponseTypeSelect;
