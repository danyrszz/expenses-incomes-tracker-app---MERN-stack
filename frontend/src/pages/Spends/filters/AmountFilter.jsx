import { useState, useRef, useEffect } from "react"
import '../styles/dropdownfilter.css'

export default function AmountFilter ({getFilter}){

  const [currentAmount, setCurrentAmount] = useState('')
  const [betweenAmounts, setBetweenAmounts] = useState({min : '', max : ''})

  const less = useRef()
  const more = useRef()
  const between = useRef()

  useEffect(()=>{ handleRadioSelection()},[])

  function handleChangeAmount( identifier, amount ){
    setCurrentAmount(amount)
    getFilter({[identifier] : amount})
  }

  function handleBetweenAmounts(identifier, amount){
    setBetweenAmounts({...betweenAmounts, [identifier] : amount})
    getFilter({...betweenAmounts, [identifier] : amount})
  }

  function handleRadioSelection(selection){

    less.current.style.display = 'none'
    more.current.style.display = 'none'
    between.current.style.display = 'none'

    switch(selection){
      case '0' :
        less.current.style.display = 'block'
        getFilter({less : currentAmount})
        break
      case '1' :
        more.current.style.display = 'block'
        getFilter({more : currentAmount})
        break
      case '2' :
        between.current.style.display = 'block'
        getFilter({
          min : betweenAmounts.min,
          max : betweenAmounts.max
        })
        break
      default : break
    }
  }

  return(
    <>
      <div className="filter-row">
          <input type="radio" name="amount" id="amount" value={0} onChange={(e)=>handleRadioSelection(e.target.value)}/>
          <label for="less">Menos de: </label>
          <div ref={less}> <input type="number" name="less" value={currentAmount} onChange={(e)=>handleChangeAmount('less', e.target.value)}/> </div>
      </div>

      <div className="filter-row">
          <input type="radio" name="amount" id="amount" value={1} onChange={(e)=>handleRadioSelection(e.target.value)}/>
          <label for="more">Mas de: </label>
          <div ref={more}> <input type="number" name="more" value={currentAmount} onChange={(e)=>handleChangeAmount('more', e.target.value)}/> </div>
      </div>

      <div className="filter-row">
          <input type="radio" name="amount" id="amount" value={2} onChange={(e)=>handleRadioSelection(e.target.value)}/>
          <label for="between">Entre: </label>
          <div ref={between}>
            <input type="number" name="min" value={betweenAmounts.min} placeholder="min" onChange={(e)=>handleBetweenAmounts('min', e.target.value)}/>
              <span> y </span> 
            <input type="number" name="max" value={betweenAmounts.max} placeholder="max" onChange={(e)=>handleBetweenAmounts('max', e.target.value)}/>
          </div>
      </div>
    </>
  )
}