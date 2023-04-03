import { saveData } from "../../utils/fetch";
import { endpoints } from "../../utils/endpoints";
import { useState } from "react";

export default function useFilterSpends(date, category, amount){

  //filter visibility
  const [filterVisible, setFilterVisible] = useState(false)
  const handleFilterVisible = ()=> setFilterVisible(!filterVisible)
  const [isFiltered, setIsFiltered] = useState(false)

  //filtered data
  const [filterSelection, setFilterSelection] = useState( {date : null, category : null, amount : null} )
  const [filteredSpends, setFilteredSpends] = useState ([])

  function handleSelection( checked, key ){
    if(checked){
      setFilterSelection({...filterSelection, [key]: null})
      return
    }
    if (key==="date") setFilterSelection({...filterSelection, date:date})
    if (key==="amount") setFilterSelection({...filterSelection, amount:amount})
    if (key==="category") setFilterSelection({...filterSelection, category:category})
  }

  async function getFilteredSpends (filterOptions) {
    console.log(filterOptions)
    return await saveData(endpoints.spends.filter(),'post', filterOptions)
  }

  async function filterSpends(){
    const res = await getFilteredSpends(filterSelection)
    setIsFiltered(true)
    setFilteredSpends(res)
    handleFilterVisible()
  }

  function resetFilter(){
    setIsFiltered(false)
    setFilteredSpends([])
    handleFilterVisible()
  }

  return {
    filterVisible,
    isFiltered,
    filterSelection,
    filteredSpends,
    handleSelection,
    filterSpends,
    resetFilter,
    handleFilterVisible,
    setFilterSelection,
    getFilteredSpends}
}