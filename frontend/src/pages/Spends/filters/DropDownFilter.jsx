import { useState, useRef } from 'react'
import '../styles/dropdownfilter.css'

export default function DropDownFilter ({title, children, filterName, handleSelection}) {

  const [visible, setVisible] = useState(false)
  const body = useRef(null)

  function manageSelection (){
    setVisible(!visible)
    visible ? body.current.style.height = '0px' : body.current.style.height = 'auto'
    handleSelection(visible, filterName)
  }

  return(
    <div className="dropdown-filter-container">
      
      <div className='dropdown-filter-head'>
        <input type="checkbox" name="" id="" onClick={manageSelection} />
        <span>{title}</span>
      </div>

      <div className='dropdown-filter-body-wrapper' ref={body}>
        <div className="dropdown-filter-body">
          {children}
        </div>
      </div>

    </div>
  )
}