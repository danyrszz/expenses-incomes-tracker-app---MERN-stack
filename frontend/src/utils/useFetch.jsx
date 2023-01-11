import { useEffect } from "react";
import { useState } from "react";

export default function useFetch(url,method){

  const [data, setData] = useState([])

  async function fetchData () {
    try{
      const data = await fetch( url, {method:method} )
      const res = await data.json()
      setData(res)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return data
}