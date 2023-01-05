import './BillCard.css'
import { useState } from 'react'
import ConfirmMessage from '../Snacks/ConfirmMessage'
import Ribbon from '../Snacks/Ribbon'
import { getFormattedDate } from '../../utils/date'

export default function BillCard({amount,date}){
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [showRibbon, setShowRibbon] = useState(false)
  const ribbonDuration = 3000
  
  const formattedDate = getFormattedDate(date)

  function handleEdit(){
    console.log("edit")
  }

  function handleDelete(response){
    if(response){
      setShowConfirmMessage(false)
      console.log("deleted")
      //...CODE TO HANDLE DELETE FROM DATABASE
      setShowRibbon(true)
    }else{
      console.log("usuario ha cancelado eliminacion")
      setShowConfirmMessage(false)
    }
  }

  const successMessage = (
    <Ribbon success={true} visible={showRibbon} onClose={()=>setShowRibbon(false)} duration={ribbonDuration}>
      <p>Se ha eliminado con éxito.</p>
    </Ribbon>
  )
  const failMessage = (
    <Ribbon success={false} visible={showRibbon} onClose={()=>setShowRibbon(false)} duration={ribbonDuration}>
      <p>No se ha podido eliminar.</p>
    </Ribbon>
  )

  return(
    <div className="card billcard-wrapper">
      <ConfirmMessage handleConfirmation={(response)=>handleDelete(response)} visible={showConfirmMessage}>
        <p>¿Seguro que quieres eliminar?</p>
      </ConfirmMessage>
      {successMessage}
      <div className="flex-column card-block-container">
        <span className='card-amount-label'>${amount}</span>
        <span className='card-date-label'>{formattedDate}</span>
      </div>
      <div className="card-button-container">
        <button className="card-button edit-button" onClick={handleEdit}>
          <span class="material-symbols-outlined">
            edit
          </span>        
        </button>
        <button className="card-button delete-button" onClick={()=>setShowConfirmMessage(true)}>
          <span class="material-symbols-outlined">
            delete
          </span>
        </button>
      </div>
    </div>
  )
}