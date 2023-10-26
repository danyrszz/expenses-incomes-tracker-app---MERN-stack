import React, { useState } from 'react'
import './styles/search.css'

function Search({search, clear}) {
  
  const [value, setValue] = useState('')

  function clearSearch () {
    clear()
    setValue('')
  }
  const handleEnter = (event) => {if (event.key === 'Enter') search(value)}

  return (
    <div className='search-wrapper'>
      <div className="search-bar">
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} onKeyUp={(event)=>handleEnter(event)} className='search-bar'/>
        <button onClick={()=>clearSearch()} className='clean-button' title='Limpiar Busqueda'> <span class="material-symbols-outlined search-icon">clear</span> </button>
        <button onClick={()=>search(value)} className='search-button' title='Buscar'> <span class="material-symbols-outlined search-icon">search</span> </button>
      </div>
    </div>
  )
}

export default Search
