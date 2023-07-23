import { useState } from "react"
import useSaveBill from "./useSaveBill"
import TextInput from "../../components/forms/TextInput"
import Datepicker from "../../components/forms/Datepicker"
import Button from "../../components/forms/Button"
import Ribbon from '../../components/Snacks/Ribbon'

import './AddBill.css'

export default function AddBill (){
  
  const [data,setData] = useState({})

  const {
    isSaved, 
    handleSaveButton,
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeVisible,
   } = useSaveBill(data)
  
  function manageChangeData (name,val){
    setData({
      ...data,
      [name] : val 
    })
  }

  return(
    <div className="flex-centered form-wrapper">
      <Ribbon success={isSaved} visible={showRibbon} duration={ribbonDuration} onClose={()=>changeVisible(false)}>
        <p>{ribbonMessage}</p>
      </Ribbon>
      <div className="card card-add-bill flex-column">
        <TextInput 
          name="quantity" 
          placeholder="Cantidad" 
          icon="attach_money"
          value={data.quantity}
          changeVal = { (val) => manageChangeData("quantity",val) }
        />
        <Datepicker setData={ (val) => manageChangeData("date",val)}/>
        <Button title="Guardar" icon="save" action={handleSaveButton} type='regular'/>
      </div>
    </div>
  )
}