import { useState, useEffect } from 'react'
import { allYears, getCurrentDate, getDates } from '../../utils/date'
import BillCard from './components/BillCard'
import Ribbon from '../../components/Snacks/Ribbon'
import ConfirmMessage from '../../components/Snacks/ConfirmMessage'
import NoData from '../../components/NoData'
import './Bill.css'
import useGetBills from './useGetBills'

export default function Bills(){
  
  const ribbonDuration = 2000

  //states for bills UI
  const [yearsArray, setYearsArray] = useState(allYears())
  const [currentMonth, setCurrentMonth] = useState(getCurrentDate().month)
  const [currentYear, setCurrentYear] = useState(getCurrentDate().year)
  const [dates, setDates] = useState (getDates(currentMonth,currentYear))
  
  //states to handle delete and edit
  const [showRibbon, setShowRibbon] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [selectedBill, setSelectedBill] = useState('')

  const [data, deleteBill, isDeleted] = useGetBills( dates.startingDate, dates.endingDate, selectedBill)
  
  //updates the date when month or year changes
  useEffect(()=>{
    setDates(getDates(currentMonth,currentYear))
  },[currentMonth, currentYear])

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

      <Ribbon success={isDeleted?true:false} visible={showRibbon} onClose={()=>setShowRibbon(false)} duration={ribbonDuration}>
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
        
        <form action="/">
          <select className='select' name="months" id="months" value={currentMonth} onChange={(e)=>setCurrentMonth(e.target.value)}>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>

          <select className='select' name="years" id="months" value={currentYear} onChange={(e)=>setCurrentYear(e.target.value)}>
            {yearsArray.map( e => {
              return <option value={e} key={e}>{e}</option>
            })}
          </select>
        </form>
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