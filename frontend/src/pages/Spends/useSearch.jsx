import { useState } from 'react'
import { endpoints } from '../../utils/endpoints'
import { saveData } from '../../utils/fetch'

function useSearch() {

  const [data,setData] = useState([])
  const [numberOfResults, setNumberOfResults] = useState(0)
  const [isSearchActive, setIsSearchActive] = useState(false)

  async function getResults (query) {
    return await saveData(endpoints.spends.search(),'post', query)
  }

  async function handleSearch (value) {
    if(!value){
      setIsSearchActive(false)
      return
    }
    const res = await getResults({query:value})
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
