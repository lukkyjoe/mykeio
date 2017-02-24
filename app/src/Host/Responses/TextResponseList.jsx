import React from 'react';



const TextResponseList = ({displayData}) => {
  const textResponseList = displayData.map((response, index) => {
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