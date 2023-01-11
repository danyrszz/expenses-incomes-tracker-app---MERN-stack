import { useEffect } from "react";
import { useState } from "react";
import { endpoints } from "../../utils/endpoints";
import { fetchData } from "../../utils/fetch";

export default function useGetBills(startingDate, endingDate){

  const [bills, setBills] = useState([])
  const url = endpoints.bills.betweenDates(startingDate,endingDate)

  useEffect(()=>{
    fetchData(url,'get')
    .then(res => setBills(res))
  }, [startingDate, endingDate])

  return [bills]
}