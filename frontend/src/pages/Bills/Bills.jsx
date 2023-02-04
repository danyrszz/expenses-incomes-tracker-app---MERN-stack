import { useState } from 'react'
import useGetBills from './hooks/useGetBills'
import { getCurrentDate, getDates, getDashedDate } from '../../utils/date'
import BillCard from './components/BillCard'
import Ribbon from '../../components/Snacks/Ribbon'
import ConfirmMessage from '../../components/Snacks/ConfirmMessage'
import NoData from '../../components/NoData'
import MonthYearSelector from './components/MonthYearSelector'
import ModalContainer from '../../components/Snacks/ModalContainer'
import './Bill.css'
import EditBill from './EditBill'

export default function Bills(){
  
  const [dates, setDates] = useState (getDates(getCurrentDate().month,getCurrentDate().year))

  const {
    bills, 
    deleteBill, 
    askDeleteConfirmation,
    changeVisible,
    editBill,
    closeEditBillDialog,
    changeBillDataToEdit,
    saveEditedBill,
    billDataToEdit,
    editBillVisible,
    confirmMessageVisible,
    ribbonDuration, 
    showRibbon, 
    ribbonMessage,
    isDeleted,
  } = useGetBills( dates.startingDate, dates.endingDate)

  function handleClickOnDeleteButton (e){
    window.scroll(0,0)
    askDeleteConfirmation(e._id)
  }

  function handleClickOnEditButton(e){
    window.scroll(0,0)
    editBill(
      {id:e._id,
      amount:e.amount,
      date:e.date}
  )}

  return(
    <div className="bills-wrapper">
      <Ribbon success={isDeleted} visible={showRibbon} onClose={()=>changeVisible(false)} duration={ribbonDuration}>
        <p>{ribbonMessage}</p>
      </Ribbon>

      <ModalContainer  visible={confirmMessageVisible}>
        <ConfirmMessage handleConfirmation={(confirmation) => deleteBill(confirmation)}>
          <p>¿Seguro que deseas eliminar?</p>
        </ConfirmMessage>
      </ModalContainer>

      <ModalContainer visible={editBillVisible}>
        <EditBill 
          bill={billDataToEdit}
          handleSaveEditBill={saveEditedBill}
          handleCloseEditDialog={closeEditBillDialog}
          handleChangeData={changeBillDataToEdit}
        />
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
                handleDelete = {()=>handleClickOnDeleteButton(e)}
                handleEdit = {()=>handleClickOnEditButton(e)}          
              />)
          })}
          </div>
        ) : ( <NoData> <p>No hay cuentas en este mes.</p> </NoData> )
      }
    </div>
  )
}