import React from 'react'
import spinner from './spinner.gif'
const Spinner = props => {
  return (
    <img
        src={spinner}
        style={{width:'200px',height:'200px',margin:'auto',display:'block'}}
    >
    </img>
  )
}



export default Spinner