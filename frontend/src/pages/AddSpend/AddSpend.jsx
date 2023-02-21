import { useState } from "react"
import Button from "../../components/forms/Button"
import Datepicker from "../../components/forms/Datepicker"
import TextInput from "../../components/forms/TextInput"
import { categories } from "../../utils/endpoints"
import Multiple from "../../components/forms/Multiple"
import Ribbon from "../../components/Snacks/Ribbon"
import useSaveSpend from "./useSaveSpend"
import './AddSpend.css'

export default function AddSpend (){

  const [data, setData] = useState({payed:false})

  const {handleSaveButton,
    isSaved,
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeDuration,
    changeVisible,
    changeMessage} = useSaveSpend(data)

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
              value={data.quantity}
              changeVal = { (val) => manageChangeData("amount",val) }
            />
          <Datepicker setData={ (val) => manageChangeData("date",val)}/>
            
          </div>

          <div className="col2">
            <Multiple 
              list={categories} 
              placeholder='Selecciona...'
              handleSelection={ (val) => manageChangeData("category",val) }
            />
            <div className="payed-container flex-column" onChange={e=>manageChangeData("payed",e.target.value==1?true:false)}>
              <span> <input type="radio" value={1} name="gender" /> Pagado </span>
              <span> <input type="radio" value={0} name="gender" defaultChecked /> No Pagado </span>
            </div>
          </div>
        </div>

        <Button title="Guardar" icon="save" action={handleSaveButton}/>
        
      </div>
    </div>
  )
}