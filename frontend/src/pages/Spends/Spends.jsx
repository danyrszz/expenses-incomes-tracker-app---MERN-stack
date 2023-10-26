import useGetLastSpends from '../Home/useGetLastSpends'
import Table from './Table'
import Button from '../../components/forms/Button'
import Search from './Search'
import MobileView from './MobileView'
import DropDownFilter from './filters/DropDownFilter'
import DateFilter from './filters/DateFilter'
import AmountFilter from './filters/AmountFilter'
import InformativeMessage from '../../components/InformativeMessage'
import SpendFilter from './SpendFilter'
import CategoryFilter from './filters/CategoryFilter'
import { useState } from 'react'
import useFilterSpends from './useFilterSpends'
import useSearch from './useSearch'

const SPENDS_SHOWED = 10
const MIN_WIDTH = 1050
const WIDTH = window.innerWidth

export default function Spends () {

  const {
    isSearchActive, numberOfResults, data,
    handleSearch, handleClear
  } = useSearch()
  
  const spends = useGetLastSpends(SPENDS_SHOWED)
  const [date,setDate] = useState(null)
  const [category,setCategory] = useState(null)
  const [amount,setAmount] = useState(null)
  const {    
    filterVisible,
    isFiltered,
    filterSelection,
    filteredSpends,
    handleSelection,
    filterSpends,
    resetFilter,
    handleFilterVisible,
    setFilterSelection
  } = useFilterSpends(date, category, amount)

  const filterUI = (<SpendFilter visible={filterVisible} changeVisible={handleFilterVisible}>
        {/* Date filter */}
        <DropDownFilter title="Fecha" filterName="date" handleSelection = {(checked, name)=>handleSelection(checked, name)}> 
          <DateFilter 
            getFilter = { (dateFilter)=> {
              setFilterSelection({...filterSelection, date: dateFilter})
              setDate(dateFilter)
            }}
          />
        </DropDownFilter>
        {/* Quantity filter */}
        <DropDownFilter title="Cantidad" filterName="amount" handleSelection = {(checked, name)=>handleSelection(checked, name)}>
          <AmountFilter 
            getFilter = { (amountFilter)=> {
              setFilterSelection({...filterSelection, amount: amountFilter})
              setAmount(amountFilter)
            }}
          />
        </DropDownFilter>
        {/* Category filter */}
        <DropDownFilter title="Categoría" filterName="category" handleSelection = {(checked, name)=>handleSelection(checked, name)}>
          <CategoryFilter
            getFilter = { (categoryFilter)=> {
              setFilterSelection({...filterSelection, category: categoryFilter})
              setCategory(categoryFilter)
            }}
          />
        </DropDownFilter>
        <Button icon="search" title="Aplicar" action={filterSpends} type='inverted'/>
        <Button icon="undo" title="Quitar" action={resetFilter} type='inverted'/>
      </SpendFilter>)
  const searchUI = <Search search={handleSearch} clear={handleClear}></Search>
  
  if(isSearchActive){
    //Return the search results.
    return(
      <>
      {[filterUI, searchUI]}
      <InformativeMessage message={`${numberOfResults} resultados para la búsqueda`}/>
      { WIDTH>MIN_WIDTH ? <Table spends = {data} /> : <MobileView spends={data}/> }
      </>
    )
  }else{
    //return the initial results or the filter results
    return (
      <>
      {[filterUI, searchUI]}
      <InformativeMessage message={ !isFiltered ? `Estás viendo los últimos ${SPENDS_SHOWED} gastos.` : 'Estas viendo gastos filtrados'}/>
      {WIDTH>MIN_WIDTH ? 
        <Table spends = { isFiltered ? filteredSpends : spends.lastSpends} /> : 
        <MobileView spends={isFiltered ? filteredSpends : spends.lastSpends}/>
      }
      </>
    )
  }
}