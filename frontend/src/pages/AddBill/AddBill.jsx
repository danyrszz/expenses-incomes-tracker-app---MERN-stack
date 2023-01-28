import { useState } from "react"
import TextInput from "../../components/forms/TextInput"
import Datepicker from "../../components/forms/Datepicker"
import Button from "../../components/forms/Button"
import Ribbon from '../../components/Snacks/Ribbon'
import { saveData as store } from "../../utils/fetch"
import {endpoints} from '../../utils/endpoints'
import { getDashedDate } from "../../utils/date"
import './AddBill.css'


export default function AddBill (){

  const ribbonDuration = 2000
  const [showRibbon, setShowRibbon] = useState(false)
  const [ribbonMessage, setRibbonMessage] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  const [data,setData] = useState({date:getDashedDate(new Date())})

  function manageChangeData (name,val){
    setData({
      ...data,
      [name] : val 
    })
  }

  async function handleSaveButton(){
    if( data.quantity && data.date){
      const bill = parseInt(data.quantity)
      //save data
      const result = await saveData({
        amount : bill,
        date : data.date,
        assetId : "63477dc75ea7762d79a7991a"
      })
      console.log(result)
      if (result){ 
        setRibbonMessage('Información guardada correctamente')
        setIsSaved(true)
        setShowRibbon(true)
        return
      }
      setRibbonMessage('Algo salio mal, intenta de nuevo.')
      setIsSaved(false)
    }else{
      setRibbonMessage('Revisa tus parámetros, por favor.')
      setIsSaved(false)
    }
    setShowRibbon(true)
  }

  async function saveData (body) {
    const res = await store( endpoints.bills.add(), 'POST', body )
    if(res.ok) return true
    return false
  }

  return(
    <div className="flex-centered form-wrapper">

      <Ribbon success={isSaved} visible={showRibbon} onClose={()=>setShowRibbon(false)} duration={ribbonDuration}>
        <p>{ribbonMessage}</p>
      </Ribbon>
      
      <div className="card card-add-bill flex-column">
        <TextInput 
          name="quantity" 
          placeholder="Ingresa cantidad" 
          icon="attach_money" 
          setData={ (val) => manageChangeData("quantity",val)} 
        />
        <Datepicker setData={ (val) => manageChangeData("date",val)}/>
        <Button title="Guardar" icon="save" action={handleSaveButton}></Button>
      </div>
    </div>
  )
}