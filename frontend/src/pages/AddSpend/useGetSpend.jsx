import { useEffect, useState } from 'react'
import { endpoints } from '../../utils/endpoints'
import { fetchData } from '../../utils/fetch'

export default function useGetSpend(id){

  const [spend, setSpend] = useState({})

  useEffect(()=>{
    fetchData(endpoints.spends.spend(id),'GET')
    .then(res => {
      setSpend({
        payed : res.payed,
        date : res.date,
        name : res.name,
        description : res.description,
        category : res.category,
        amount : res.amount,
      })
    })
  }, [])
  
  return {spend}
}