import { useState } from 'react'
import useRibbon from '../../components/Snacks/useRibbon'
import { endpoints } from '../../utils/endpoints'
import { saveData as store } from '../../utils/fetch'
import useGetAssetID from '../useGetAssetId'

export default function useSaveBill(data, manageChangeData){

  const [isSaved, setIsSaved] = useState(false)
  const {currentAsset} = useGetAssetID()

  const {
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeDuration,
    changeVisible,
    changeMessage
   } = useRibbon()

  async function handleSaveButton(){
    function setSavingParams (message, saved, visible) {
    changeMessage(message)
    setIsSaved(saved)
    changeVisible(visible)
    }
    if(!data.quantity || !data.date){
    setSavingParams('Completa todos los campos, por favor.',false,true)
    return
    } 
    const bill = parseInt(data.quantity)
    const result = await saveData({
    amount : bill,
    date : data.date,
    assetId : currentAsset
    })
    if (!result){ 
    setSavingParams('Algo salio mal, intenta de nuevo.',false,true)
    return
    }
    setSavingParams('Información guardada correctamente', true, true)
    manageChangeData("quantity", "")
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
    changeMessage,
  }
}