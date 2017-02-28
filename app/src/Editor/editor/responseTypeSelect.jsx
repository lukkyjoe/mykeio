import React from 'react';
import styles from '../EditorMain.css';

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
          <div className={styles.textOrMultipleChoice}>
            <label>
              <input type="radio" name="foo" value="MULTIPLE_CHOICE" onChange={this.handleClick.bind(this)} />
              Multiple choice &nbsp; &nbsp;   
            </label>
            <label>
              <input type="radio" name="foo" value="TEXT" onChange={this.handleClick.bind(this)}/>
              Short answer
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default ResponseTypeSelect;