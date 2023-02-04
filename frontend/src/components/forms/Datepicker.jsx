import './styles/TextInput.css'
import './styles/Datepicker.css'
import React from 'react';
import { useState } from 'react'
import DatePicker from "react-datepicker";
import {getDashedDate} from '../../utils/date'
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from 'react';

export default function Datepicker ({setData, editableDate}){

  const [date, setDate] = useState(new Date())

  useEffect(()=>{
    setData(getDashedDate(date))
  },[date])

  useEffect(()=>{
    if(editableDate) setDate(new Date(editableDate))
  },[editableDate])

  const DatepickerButton = React.forwardRef(({ onClick }, ref) => (
    <button className='datepicker-input' onClick={onClick} ref={ref}>
      <span class="material-symbols-outlined form-icon">
      calendar_month
      </span>
    </button>
  ));

  return(
    <div className="datepicker-wrapper input-wrapper">

      <span class="material-symbols-outlined form-icon">
      calendar_month
      </span>

      <input name="date" placeholder="Fecha" className='input-styled' value={getDashedDate(date)} disabled />

      <div className="datepicker-button flex-centered">
        <DatePicker 
          selected={date} 
          onChange={(date) => setDate(date)}
          customInput={<DatepickerButton />} />
      </div>
    </div>
  )
}