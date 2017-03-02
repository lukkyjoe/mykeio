import React from 'react';
import styles from './responseTypeSelect.css';

class ResponseTypeSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected:true
    }
  }

  handleClick(event) {
    this.props.selectResponseType(event.currentTarget.getAttribute('type'));

    if (event.currentTarget.getAttribute('type') === 'TEXT' && this.state.selected === false){
      this.setState({
        selected:true
      })
    }

    if (event.currentTarget.getAttribute('type') === 'MULTIPLE_CHOICE' && this.state.selected === true){
      this.setState({
        selected:false
      })
    } 
  }
  render() {
    return (
      <div>
        <form>
          <div className={styles.textOrMultipleChoice}>
            <div type="MULTIPLE_CHOICE" onClick={this.handleClick.bind(this)} className={styles.multButton + (this.state.selected?'':' ' + styles.selected)}>
              <p className={styles.buttonText}>Multiple choice</p>
            </div>
            <div type="TEXT" onClick={this.handleClick.bind(this)} className={styles.multButton + (this.state.selected? ' ' + styles.selected:'')}>
              <p className={styles.buttonText}>Short answer</p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ResponseTypeSelect;
