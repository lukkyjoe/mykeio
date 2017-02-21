import React from 'react';
import ResponseTally from './ResponseTally.jsx';

const fakeResponseData = ['hi', 'hello', 'bonjour']


const ResponsesView = (props) => {
  const responseList = fakeResponseData.map((response, index) => {
    return (
      <ResponseTally response={response} key={index}/>
    )
  })
  
  return (
    <div>
      <table>
        <tbody>
          {responseList}
        </tbody>
      </table>
    </div>
  )
}

export default ResponsesView;