import { useState, useEffect } from 'react'
import { allYears, getCurrentDate, getDates } from '../utils/date'
import {endpoints} from '../utils/endpoints'
import BillCard from '../components/Bills/BillCard'
import Ribbon from '../components/Snacks/Ribbon'
import ConfirmMessage from '../components/Snacks/ConfirmMessage'
import NoData from '../components/NoData'
import './styles/Bill.css'

export default function Bills(){

  //states for bills UI
  const [yearsArray, setYearsArray] = useState(allYears())
  const [currentMonth, setCurrentMonth] = useState(getCurrentDate().month)
  const [currentYear, setCurrentYear] = useState(getCurrentDate().year)
  const [dates, setDates] = useState (getDates(currentMonth,currentYear))
  const [data, setData] = useState([])

  //states to handle delete and edit
  const [showRibbon, setShowRibbon] = useState(false)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)
  const [selectedBill, setSelectedBill] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const ribbonDuration = 3000

  //selects the bill and updates the state with the current bill
  const handleSelectBillToDelete = (id)=>{
    window.scrollTo(0,0)
    setShowConfirmMessage(true)
    setSelectedBill(id)
  }

  const handleDeleteConfirmation = (itsConfirmed)=>{
    if(itsConfirmed){
      setShowConfirmMessage(false)
      setSelectedBill('')
      setShowRibbon(true)
      deleteBill(selectedBill)
    }else{
      setSelectedBill('')
      setShowConfirmMessage(false)
    }
  }

  async function deleteBill(id){
    const res = await fetch( endpoints.bills.delete(id) ,{method:'DELETE'})
    res.ok ? setIsDeleted(true) : setIsDeleted(false)
    await getData()
  }

  //updates the date when month or year changes
  useEffect(()=>{
    setDates(getDates(currentMonth,currentYear))
  },[currentMonth, currentYear])

  //fetch the data when the date is changed
  useEffect(()=>{
    getData()
  },[dates])
  
  async function getData () {
    try{
      const data = await fetch(endpoints.bills.betweenDates(dates.startingDate, dates.endingDate))
      const res = await data.json()
      setData(res)
    }catch(e){
      console.log(e)
    }
  }
  
  //UI components
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
    <div className="bills-wrapper">
      {isDeleted ? successMessage : failMessage}
      <ConfirmMessage visible={showConfirmMessage} handleConfirmation={itsConfirmed=>handleDeleteConfirmation(itsConfirmed)}>
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
      {
        //prints the bills or no data
        data.length>0 ? (
          <div className="bills-container">
            {data.map( e=> {
              return  <BillCard
              amount = {e.amount}
              key = {e._id}
              date = {e.date}
              selectBillToDelete = {()=>handleSelectBillToDelete(e._id)}
              />
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