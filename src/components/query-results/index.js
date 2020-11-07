import React, { useState } from 'react'
import MultipleResults from './MultipleResults'
import SingleResult from './SingleResult'

export default function QueryResults(props) {
  return (
    <div>{(props.queryResultList.length > 1)?(
      <MultipleResults species={props.queryResultList}/>
    ):(
      <SingleResult specie={props.queryResultList[0]}/>
    )}</div>
  )
}
