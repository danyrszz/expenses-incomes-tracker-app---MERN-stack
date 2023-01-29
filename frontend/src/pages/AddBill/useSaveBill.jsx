import { useState } from 'react'
import useRibbon from '../../components/Snacks/useRibbon'
import { endpoints } from '../../utils/endpoints'
import { saveData as store } from '../../utils/fetch'

export default function useSaveBill(data){

  const [isSaved, setIsSaved] = useState(false)

  const {
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeDuration,
    changeVisible,
    changeMessage
   } = useRibbon()

  async function handleSaveButton(){
    console.log(data)
    if( data.quantity && data.date ){
      const bill = parseInt(data.quantity)
      const result = await saveData({
        amount : bill,
        date : data.date,
        assetId : "63477dc75ea7762d79a7991a"
      })
      if (result){ 
        changeMessage('Información guardada correctamente')
        setIsSaved(true)
        changeVisible(true)
        return
      }
      changeMessage('Algo salio mal, intenta de nuevo.')
      setIsSaved(false)
    }else{
      changeMessage('Completa todos los campos, por favor.')
      setIsSaved(false)
    }
    changeVisible(true)
  }
  
  async function saveData (body) {
    const res = await store( endpoints.bills.add(), 'POST', body )
    if(res.ok) return true
    return false
  }

  return {
    isSaved,
    handleSaveButton,
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeDuration,
    changeVisible,
    changeMessage  
  }
}