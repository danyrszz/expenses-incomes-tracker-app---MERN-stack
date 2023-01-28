import { useState } from 'react'
import { getCurrentDate, getDates } from '../../utils/date'
import BillCard from './components/BillCard'
import Ribbon from '../../components/Snacks/Ribbon'
import ConfirmMessage from '../../components/Snacks/ConfirmMessage'
import NoData from '../../components/NoData'
import './Bill.css'
import useGetBills from './useGetBills'

import MonthYearSelector from './components/MonthYearSelector'

export default function Bills(){
  
  const ribbonDuration = 2000
  const [showRibbon, setShowRibbon] = useState(false)

  const [dates, setDates] = useState (getDates(getCurrentDate().month,getCurrentDate().year))

  //states to handle delete and edit
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [selectedBill, setSelectedBill] = useState('')

  const [data, deleteBill, isDeleted] = useGetBills( dates.startingDate, dates.endingDate, selectedBill)

  function handleDeleteConfirmation (confirmation){
    if(confirmation){
      deleteBill()
      setShowConfirmMessage(false)
      setShowRibbon(true)
    }else{
      setShowConfirmMessage(false)
    }
    setSelectedBill('')
  }

  return(
    <div className="bills-wrapper">

      <Ribbon success={isDeleted} visible={showRibbon} onClose={()=>setShowRibbon(false)} duration={ribbonDuration}>
        {isDeleted?(
          <p>Se ha eliminado con éxito.</p>
        ):(
          <p>No se ha podido eliminar.</p>
        )}
      </Ribbon>

      <ConfirmMessage visible={showConfirmMessage} handleConfirmation={(confirmation) => handleDeleteConfirmation(confirmation)}>
        <p>¿Seguro que desea eliminar?</p>
      </ConfirmMessage>

      <div className="bill-section flex-row">
        <MonthYearSelector queryDates={(dates)=>setDates(dates)} />
      </div>
      
      <p className='sum-title'>
      Total: ${data.reduce( (current, e)=> current + e.amount, 0)}
      </p>
      {
      //prints the bills or no data
      data.length>0 ? (
        <div className="bills-container">
          {data.map( e=> {
            return ( 
              <BillCard
                amount = {e.amount}
                key = {e._id}
                date = {e.date}
                handleDelete = {()=>{
                  window.scroll(0,0)
                  setShowConfirmMessage(true)
                  setSelectedBill(e._id)
                  }}
              />)
          })}
          </div>
        ) : (
          <NoData>
            <p>No hay cuentas en este mes.</p>
          </NoData>
        )
      }
    </div>
  )
}