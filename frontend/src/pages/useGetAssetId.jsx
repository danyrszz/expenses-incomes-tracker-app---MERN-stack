import { useEffect, useState } from 'react'
import { endpoints } from '../utils/endpoints'
import { fetchData } from '../utils/fetch'

export default function useGetAssetID(){
  const [currentAsset, setCurrentAsset] = useState()
  const [name, setName] = useState()

  useEffect(()=>{
    fetchData(endpoints.assets(),'GET')
    .then(res => {
      setCurrentAsset(res[0]._id)
      setName(res[0].name)
    })
  }, [])
  
  return {currentAsset,name}
}