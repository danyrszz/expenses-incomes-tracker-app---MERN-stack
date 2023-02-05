import { useEffect, useState } from "react";
import useConfirmMessage from "../../../components/Snacks/useConfirmMessage";
import { endpoints } from "../../../utils/endpoints";
import { fetchData, saveData } from "../../../utils/fetch";

export default function useGetBills(startingDate, endingDate){

  const [bills, setBills] = useState([])
  const [selectedBill, setSelectedBill] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const fetchUrl = endpoints.bills.betweenDates(startingDate,endingDate)

  //editbill
  const[billDataToEdit, setBillDataToEdit] = useState(
    {id:'',
    amount:0,
    date:null})
  const[editBillVisible, setEditBillVisible] = useState(false)
  
  const {
    ribbonDuration, 
    showRibbon, 
    ribbonMessage, 
    confirmMessageVisible, 
    handleConfirmation, 
    showConfirmDialog,
    changeVisible
  } = useConfirmMessage()
  
  //fetch data when the date changes
  useEffect(()=>{
    fetchData(fetchUrl,'get')
    .then(res => setBills(res))
  }, [startingDate, endingDate])

  function askDeleteConfirmation (bill) {
    showConfirmDialog()
    setSelectedBill(endpoints.bills.bill(bill))
  }

  async function deleteBill(confirmed){
    if(confirmed){
      const res = await fetchData(selectedBill,'delete')
      if(res.ok){
        handleConfirmation(true, "Se ha eliminado correctamente.")
        setIsDeleted(true)
      }else{
        handleConfirmation(true,"No se ha podido eliminar.")
        setIsDeleted(false)
      }
      const data = await fetchData(fetchUrl,'get')
      setBills(data)
    }else{
      handleConfirmation(false)
    }
  }

  const closeEditBillDialog = () => setEditBillVisible(false)

  function editBill(bill){
    setEditBillVisible(true)
    setBillDataToEdit(bill)
  }

  async function saveEditedBill(){
    const url = endpoints.bills.bill(billDataToEdit.id)
    const amount = parseInt(billDataToEdit.amount)
    const date = billDataToEdit.date
    const res = await saveData (url,"put", {
      amount : amount,
      date : date
    })
    const data = await fetchData(fetchUrl,'get')
    setBills(data)
    setEditBillVisible(false)
  }

  function changeBillDataToEdit (name,val){
    setBillDataToEdit({
      ...billDataToEdit,
      [name] : val 
    })
  }

  return {bills,
    deleteBill, 
    askDeleteConfirmation,
    editBill,
    closeEditBillDialog,
    handleConfirmation,
    changeVisible,
    changeBillDataToEdit,
    saveEditedBill,
    billDataToEdit,
    editBillVisible,
    isDeleted,
    confirmMessageVisible,
    ribbonDuration, 
    showRibbon, 
    ribbonMessage,
  }
}