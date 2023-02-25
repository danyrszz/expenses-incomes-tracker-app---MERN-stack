import { useState, useEffect } from "react"
import Button from "../../components/forms/Button"
import Datepicker from "../../components/forms/Datepicker"
import TextInput from "../../components/forms/TextInput"
import { categories } from "../../utils/endpoints"
import Multiple from "../../components/forms/Multiple"
import Ribbon from "../../components/Snacks/Ribbon"
import useSaveSpend from "./useSaveSpend"
import './AddSpend.css'
import { fetchData } from "../../utils/fetch"
import { endpoints } from "../../utils/endpoints"
import { useLoaderData } from "react-router-dom"
import { getDashedDate } from "../../utils/date"

export async function loader({params}){
  const res = await fetchData(endpoints.spends.spend(params.id),'GET')
  const spend = {
    id : res._id,
    payed : res.payed,
    date : res.date,
    name : res.name,
    description : res.description,
    category : res.category,
    amount : res.amount,
  }
  return {spend}
}

export default function AddSpend (){

  const [data, setData] = useState({payed:false})
  const [newRecord, setNewRecord] = useState(true)
  const currentSpend = useLoaderData();

  useEffect(()=>{
    if(currentSpend){ 
      setData(currentSpend.spend)
      setNewRecord(false)
    }else{
      setData({payed:false, date:new Date()})
      setNewRecord(true)
    }
  },[currentSpend])

  const {handleSaveButton,
    isSaved,
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeVisible} = useSaveSpend(data, newRecord)

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

      <div className="card card-add-spend flex-column">
        <TextInput 
            name="name" 
            placeholder="Nombre del gasto" 
            icon="label"
            value={data.name}
            changeVal = { (val) => manageChangeData("name",val) }
        />
        <TextInput 
            name="description" 
            placeholder="Descripcion" 
            icon="description"
            value={data.description}
            changeVal = { (val) => manageChangeData("description",val) }
        />

        <div className="form-two-columns">
          <div className="col1">
            <TextInput 
              name="quantity" 
              placeholder="Cantidad" 
              icon="attach_money"
              value={data.amount}
              changeVal = { (val) => manageChangeData("amount",val) }
            />

            <Datepicker 
            setData={ (val) => manageChangeData("date",val)} 
            editableDate={currentSpend && data.date}/>
          </div>

          <div className="col2">
            <Multiple 
              list={categories} 
              placeholder='Categoria...'
              handleSelection={ (val) => manageChangeData("category",val) }
              value = {currentSpend && data.category}
            />
            <div className="payed-container flex-column" onChange={e=>manageChangeData("payed",e.target.value==1?true:false)}>
              <span> <input type="radio" value={1} name="gender" checked={data.payed?true:false}/> Pagado </span>
              <span> <input type="radio" value={0} name="gender" checked={data.payed?false:true} /> No Pagado </span>
            </div>
          </div>
        </div>

        <Button title="Guardar" icon="save" action={handleSaveButton}/>
        
      </div>
    </div>
  )
}