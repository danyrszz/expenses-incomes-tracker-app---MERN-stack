import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetch";
import { endpoints } from "../../utils/endpoints";

export default function useGetLastSpends(limit){

  const [lastSpends, setLastSpends] = useState([])

  useEffect(()=>{
    getLastSpends(limit)
  },[])

  async function getLastSpends (limit) {
    const res = fetchData(endpoints.spends.last(limit),'get')
    setLastSpends(await res)
  }

  return {lastSpends}
}