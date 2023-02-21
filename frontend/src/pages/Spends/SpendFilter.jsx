import ModalContainer from "../../components/Snacks/ModalContainer"
import { useState } from "react"
import "./styles/SpendFilter.css"

export default function SpendFilter ({toggleFilterVisible}){
  const [visible, setVisible] = useState(false)
  return(
    <ModalContainer visible={visible}>
      <div className="filter-container">
        
      </div>
    </ModalContainer>
  )
}