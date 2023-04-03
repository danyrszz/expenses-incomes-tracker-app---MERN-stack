import TextInput from "../../components/forms/TextInput"
import Datepicker from "../../components/forms/Datepicker"
import Button from "../../components/forms/Button"
import { useEffect } from "react"

export default function EditBill({bill, handleCloseEditDialog, handleSaveEditBill, handleChangeData}){

  return (
    <div className="flex-centered form-wrapper">
      <div className="card card-add-bill flex-column">
        <TextInput 
          name="quantity" 
          placeholder="Cantidad" 
          icon="attach_money"
          value={bill&& bill.amount}
          changeVal = { (val) => handleChangeData("amount",val) }
        />
        <Datepicker setData={ (val) => handleChangeData("date",val)} currentDate={bill && bill.date}/>
        <Button title="Guardar" icon="save" action={handleSaveEditBill} type='regular'/>
        <Button title="Cancelar" icon="cancel" action={handleCloseEditDialog} type='delete'/>
      </div>
    </div>
  )
}