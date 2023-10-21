import { useState, useRef, useEffect } from "react"
import '../styles/dropdownfilter.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function DateFilter ({getFilter}){

  const [currentDate, setCurrentDate] = useState(new Date())
  const [betweenDates, setBetweenDates] = useState({start : new Date(), end : new Date()})

  useEffect(()=>{ handleRadioSelection()},[]) //hides all the inputs on first render
  
  const before = useRef()
  const after = useRef()
  const between = useRef()

  function manageChangeDates( identifier, date ){
    setCurrentDate(date)
    getFilter({[identifier] : date})
  }

  function handleBetweenDates(identifier, date){
    setBetweenDates({...betweenDates, [identifier] : date})
    getFilter({...betweenDates, [identifier] : date})
  }

  function handleRadioSelection(selection){

    before.current.style.display = 'none'
    after.current.style.display = 'none'
    between.current.style.display = 'none'

    switch(selection){
      case '0' :
        before.current.style.display = 'block'
        getFilter({before : currentDate})
        break
      case '1' :
        after.current.style.display = 'block'
        getFilter({after : currentDate})
        break
      case '2' :
        between.current.style.display = 'block'
        getFilter({
          start : betweenDates.start,
          end : betweenDates.end
        })
        break
      default :
        break
    }
  }

  return(
    <>
      <div className="filter-row">
          <input type="radio" name="date" id="date" value={0} onChange={(e)=>handleRadioSelection(e.target.value)}/>
          <label for="before">Antes de: </label>
          <div ref={before}>
            <DatePicker 
              selected={currentDate} 
              onChange={(val) => manageChangeDates("before",val)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"/>          
          </div>
      </div>

      <div className="filter-row">
          <input type="radio" name="date" id="date" value={1} onChange={(e)=>handleRadioSelection(e.target.value)}/>
          <label for="after">Despues de: </label>
          <div ref={after}>
            <DatePicker 
              selected={currentDate} 
              onChange={(val) => manageChangeDates("after",val)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"/>
          </div>
      </div>

      <div className="filter-row">
          <input type="radio" name="date" id="date" value={2} onChange={(e)=>handleRadioSelection(e.target.value)}/>
          <label for="between">Entre: </label>
          <div ref={between}>
            <div className="inline-datepicker">
              <DatePicker 
                selected={betweenDates.start} 
                onChange={(val) => handleBetweenDates("start",val)}
                wrapperClassName="inline-datepicker"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div> 
            <span> y </span> 
            <div className="inline-datepicker">
              <DatePicker 
                selected={betweenDates.end} 
                onChange={(val) => handleBetweenDates("end",val)}
                wrapperClassName="inline-datepicker"
              />
            </div>
          </div>
      </div>
    </>
  )
}