import { useEffect, useState } from "react";
import useConfirmMessage from "../../components/Snacks/useConfirmMessage";
import { endpoints } from "../../utils/endpoints";
import { fetchData } from "../../utils/fetch";

export default function useGetBills(startingDate, endingDate){

  const [bills, setBills] = useState([])
  const [billToDelete, setBillToDelete] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const fetchUrl = endpoints.bills.betweenDates(startingDate,endingDate)
  
  const {
    ribbonDuration, 
    showRibbon, 
    ribbonMessage, 
    dialogVisible, 
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
    setBillToDelete(endpoints.bills.delete(bill))
  }

  async function deleteBill(confirmed){
    if(confirmed){
      const res = await fetchData(billToDelete,'delete')
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

  return {bills, 
    deleteBill, 
    askDeleteConfirmation, 
    handleConfirmation,
    changeVisible,
    isDeleted,
    dialogVisible,
    ribbonDuration, 
    showRibbon, 
    ribbonMessage,
  }
}