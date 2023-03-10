import { useState } from "react"
import "./styles/SpendFilter.css"

export default function SpendFilter ({toggleFilterVisible}){
  const [visible, setVisible] = useState(false)

  return(
    <>
      <div className="filter-bar-container">
        <span>
          { !visible ? 'Open Filter' : 'Close Filter'}
        </span>
      </div>

      <div className={'filter-container ' + (!visible&&'filter-closed') }>
        i'm the filter container
      </div>
    </>
  )
}