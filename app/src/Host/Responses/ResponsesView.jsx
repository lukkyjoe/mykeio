import React from 'react';
import ResponseTally from './ResponseTally.jsx';
import styles from './ResponsesView.css';

const fakeResponseData = [
  {choice: 'hey', tally: 3}, 
  {choice: 'hello', tally: 7},
  {choice: 'sup', tally: 3},
  {choice: 'yo', tally: 4}
  ]

// 1. render different multiple choices and tallies based on selected prompt (from right column)
// 2. up the tally based on a selection on client side (assume client clicks and selects one)

const ResponsesView = (props) => {
  const responseList = fakeResponseData.map((response, index) => {
    return (
      <ResponseTally response={response} key={index}/>
    )
  })
  
  return (
    <div>
      <table className={styles.responsesView}>
        <tbody>
          {responseList}
        </tbody>
      </table>
    </div>
  )
}

export default ResponsesView;