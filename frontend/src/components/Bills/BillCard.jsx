import './BillCard.css'
import { useState } from 'react'
import ConfirmMessage from '../Snacks/ConfirmMessage'
import Ribbon from '../Snacks/Ribbon'

export default function BillCard({amount,date}){
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  const d = new Date(date)
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
  console.log(d.getDate())

  function handleEdit(){
    console.log("edit")
  }

  function handleDelete(response){
    if(response){
      console.log("deleted")
      //...CODE TO HANDLE DELETE FROM DATABASE
      setShowConfirmMessage(false)
    }else{
      console.log("usuario ha cancelado eliminacion")
      setShowConfirmMessage(false)
    }
  }
  
  return(
    <div className="card flex-column">
      {showConfirmMessage ? (
        <ConfirmMessage handleConfirmation={(response)=>handleDelete(response)}>
          <p>¿Seguro que quieres eliminar?</p>
        </ConfirmMessage>
        ):null}
      <Ribbon ok={true}>
        <p>Informacion actualizada correctamente</p>
      </Ribbon>
      <div className="flex-column card-block-container">
        <span className='card-amount-label'>$1500</span>
        <span className='card-date-label'>10 diciembre 2022</span>
      </div>
      <div className="flex-row card-button-container">
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