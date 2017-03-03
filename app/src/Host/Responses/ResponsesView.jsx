import React from 'react';
import ResponseTally from './ResponseTally.jsx';
import styles from './ResponsesView.css';

// 1. render different multiple choices and tallies based on selected prompt (from right column)
// 2. up the tally based on a selection on client side (assume client clicks and selects one)

const ResponsesView = ({displayData}) => {
  const responseList = displayData.map((response, index) => {
    return (
      <ResponseTally response={response} key={index}/>
    )
  })
  
  return (
    <div>
          {responseList}
    </div>
  )
}

export default ResponsesView;