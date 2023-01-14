import { useEffect, useState } from "react";
import { endpoints } from "../../utils/endpoints";
import { fetchData } from "../../utils/fetch";

export default function useGetBills(startingDate, endingDate, selectedBill){

  const [bills, setBills] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)
  const fetchUrl = endpoints.bills.betweenDates(startingDate,endingDate)
  const deleteUrl = endpoints.bills.delete(selectedBill)
  
  //fetch data when the date changes
  useEffect(()=>{
    fetchData(fetchUrl,'get')
    .then(res => setBills(res))
  }, [startingDate, endingDate])
  
  async function deleteBill(){
    const res = await fetchData(deleteUrl,'delete')
    res.ok ? setIsDeleted(true) : setIsDeleted(false)
    const data = await fetchData(fetchUrl,'get')
    setBills(data)
  }

  return [bills, deleteBill, isDeleted]
}