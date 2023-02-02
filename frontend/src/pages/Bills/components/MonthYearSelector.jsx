import { useState, useEffect } from "react"
import { allYears, getCurrentDate, getDates } from '../../../utils/date'

export default function MonthYearSelector({queryDates}){

  const [yearsArray, setYearsArray] = useState(allYears())
  const [currentMonth, setCurrentMonth] = useState(getCurrentDate().month)
  const [currentYear, setCurrentYear] = useState(getCurrentDate().year)
  const [dates, setDates] = useState (getDates(currentMonth,currentYear))

  //updates the date when month or year changes
  useEffect(()=>{
    setDates(getDates(currentMonth,currentYear))
  },[currentMonth, currentYear])

  useEffect(()=>{
    queryDates(dates)
  },[dates])

  return (
    <form action="/">
      <select className='select' name="months" id="months" value={currentMonth} onChange={(e)=>setCurrentMonth(e.target.value)}>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>

      <select className='select' name="years" id="months" value={currentYear} onChange={(e)=>setCurrentYear(e.target.value)}>
        {yearsArray.map( e => {
          return <option value={e} key={e}>{e}</option>
        })}
      </select>
    </form> )
}