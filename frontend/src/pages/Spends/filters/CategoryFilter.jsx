import { useState, useRef, useEffect } from "react"
import { categories } from "../../../utils/endpoints"
import '../styles/dropdownfilter.css'

export default function CategoryFilter ({getFilter}){

  const categoryInput = useRef()

  function handleChangeAmount( category ){
    getFilter(category)
  }

  return(
    <>
      <div className="filter-row">
          <label for="less">Categoría: </label>
          <div ref={categoryInput}>
            <select name="category" id="category" onChange={e=>handleChangeAmount(e.target.value)}>
              <option value="" disabled selected>Categoría...</option>
              {categories.map(e=>{
                return <option value={e} key={e}>{e}</option>
              })}
            </select>
          </div>
      </div>
    </>
  )
}