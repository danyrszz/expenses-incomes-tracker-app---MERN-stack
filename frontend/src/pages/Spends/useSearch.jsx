import { useState } from 'react'
import { endpoints } from '../../utils/endpoints'
import { saveData } from '../../utils/fetch'

function useSearch() {

  const [data,setData] = useState([])
  const [numberOfResults, setNumberOfResults] = useState(0)
  const [isSearchActive, setIsSearchActive] = useState(false)

  async function handleSearch (value) {
    const url = endpoints.spends.search()
    if(!value){
      setIsSearchActive(false)
      return
    }
    const res = await saveData(url,'POST', {query:value})
    setData(res)
    setNumberOfResults(res.length)
    setIsSearchActive(true)
  }

  const handleClear = ()=> {
    setData([])
    setNumberOfResults(0)
    setIsSearchActive(false)
  }

  return {
    data, isSearchActive, numberOfResults,
    handleSearch, handleClear
  }
  
}

export default useSearch
