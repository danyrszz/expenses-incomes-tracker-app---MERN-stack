import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetch";
import { endpoints } from "../../utils/endpoints";

export default function useGetLastBills(limit){

  const [lastBills, setLastBills] = useState([])

  useEffect(()=>{
    getLastBills(limit)
  },[])

  async function getLastBills (limit) {
    const res = fetchData(endpoints.bills.last(limit),'get')
    setLastBills(await res)
  }

  return {lastBills}
}