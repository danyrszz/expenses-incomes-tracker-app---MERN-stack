import { useState } from "react"
import TextInput from "../../components/forms/TextInput"
import Datepicker from "../../components/forms/Datepicker"
import Button from "../../components/forms/Button"
import { getDashedDate } from "../../utils/date"
import './AddBill.css'


export default function AddBill (){
  const [data,setData] = useState({date:getDashedDate(new Date())})

  function manageChangeData (name,val){
    console.log(val, name)
    setData({
      ...data,
      [name] : val 
    })
  }

  function saveData () {
    if(data.quantity && data.date) console.log(data)
  }

  return(
    <div className="flex-centered form-wrapper">
      <div className="card card-add-bill flex-column">
        <TextInput 
          name="quantity" 
          placeholder="Ingresa cantidad" 
          icon="attach_money" 
          setData={ (val) => manageChangeData("quantity",val)} 
        />
        <Datepicker setData={ (val) => manageChangeData("date",val)}/>
        <Button title="Guardar" icon="save" action={saveData}></Button>
      </div>
    </div>
  )
}