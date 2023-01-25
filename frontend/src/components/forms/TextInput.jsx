import './styles/TextInput.css'
import { useState } from 'react'
export default function TextInput ({placeholder,name,icon,setData}){

  const [value, setValue] = useState("")

  function handleChange(value){
    setValue(value)
    setData(value)
  }

  return(
    <div className="input-wrapper">

      <span class="material-symbols-outlined form-icon">
      {icon}
      </span>

      <input name={name} placeholder={placeholder} className='input-styled' value={value} onChange={e=>handleChange(e.target.value)}/>
    </div>
  )
}