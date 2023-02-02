import { useState } from 'react'
import useGetBills from './useGetBills'
import { getCurrentDate, getDates } from '../../utils/date'
import BillCard from './components/BillCard'
import Ribbon from '../../components/Snacks/Ribbon'
import ConfirmMessage from '../../components/Snacks/ConfirmMessage'
import NoData from '../../components/NoData'
import MonthYearSelector from './components/MonthYearSelector'
import ModalContainer from '../../components/Snacks/ModalContainer'
import './Bill.css'

export default function Bills(){
  
  const [dates, setDates] = useState (getDates(getCurrentDate().month,getCurrentDate().year))

  const {
    bills, 
    deleteBill, 
    askDeleteConfirmation,
    changeVisible,
    dialogVisible,
    ribbonDuration, 
    showRibbon, 
    ribbonMessage,
    isDeleted,
  } = useGetBills( dates.startingDate, dates.endingDate)

  return(
    <div className="bills-wrapper">
      <Ribbon success={isDeleted} visible={showRibbon} onClose={()=>changeVisible(false)} duration={ribbonDuration}>
        <p>{ribbonMessage}</p>
      </Ribbon>

      <ModalContainer  visible={dialogVisible}>
        <ConfirmMessage handleConfirmation={(confirmation) => deleteBill(confirmation)}>
          <p>¿Seguro que desea eliminar?</p>
        </ConfirmMessage>
      </ModalContainer>

      <div className="bill-section flex-row">
        <MonthYearSelector queryDates={(dates)=>setDates(dates)} />
      </div>
      
      <p className='sum-title'>
      Total: ${bills.reduce( (current, e)=> current + e.amount, 0)}
      </p>
      {
      //prints the bills or no data
      bills.length>0 ? (
        <div className="bills-container">
          {bills.map( e=> {
            return ( 
              <BillCard
                amount = {e.amount}
                key = {e._id}
                date = {e.date}
                handleDelete = {()=>{
                  window.scroll(0,0)
                  askDeleteConfirmation(e._id)
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