import React from 'react';



const TextResponseList = ({textResponses}) => {
  const textResponseList = textResponses.map((response, index) => {
    return (
      <div>{response} </div>
    )
  })
  
  return (
    <div>
      <table>
        <tbody>
          {textResponseList}
        </tbody>
      </table>
    </div>
  )
}

export default TextResponseList;