import useRibbon from "../../components/Snacks/useRibbon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../utils/endpoints";
import useGetAssetID from "../useGetAssetId";
import { saveData as store } from "../../utils/fetch";

export default function useSaveSpend (data){

  const [isSaved, setIsSaved] = useState(false)
  const {currentAsset} = useGetAssetID()
  const navigate = useNavigate()

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
    if(!data.amount || !data.date || !data.category || !data.name ){
      setSavingParams('Completa todos los campos, por favor.',false,true)
      return
    }
    const result = await saveData ({
      amount : parseFloat(data.amount),
      date : data.date,
      description : data.description,
      name: data.name,
      category : data.category,
      payed : data.payed,
      assetId : currentAsset
    })
    if (!result){ 
      setSavingParams('Algo salio mal, intenta de nuevo.',false,true)
      return
    }
    setSavingParams('Información guardada correctamente', true, true)
  }

  async function saveData (body) {
    const res = await store( endpoints.spends.add(), 'POST', body )
    if(res.ok) return true
    return false
  }

  return {
    handleSaveButton,
    isSaved,
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeDuration,
    changeVisible,
    changeMessage
  }
}