import useRibbon from "../../components/Snacks/useRibbon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../utils/endpoints";
import useGetAssetID from "../useGetAssetId";
import { saveData as store } from "../../utils/fetch";

export default function useSaveSpend (data, newRecord){

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
    let result
    function setSavingParams (message, saved, visible) {
      changeMessage(message)
      setIsSaved(saved)
      changeVisible(visible)
    }
    if(!data.amount || !data.date || !data.category || !data.name ){
      setSavingParams('Completa todos los campos, por favor.',false,true)
      return
    }
    if(newRecord){
      result = await saveData ( data,endpoints.spends.add(),'post' )
    }else{
      result = await saveData ( data, endpoints.spends.spend(data.id), 'put' )
    }
    if (!result){ 
      setSavingParams('Algo salio mal, intenta de nuevo.',false,true)
      return
    }
    setSavingParams('Información guardada correctamente', true, true)
    const timer = setTimeout(() => {
      navigate('/')
      if(isSaved) clearTimeout(timer) 
    }, ribbonDuration)
  }

  async function saveData (data, url, method) {
    const body = {
      amount : parseFloat(data.amount),
      date : data.date,
      description : data.description,
      name: data.name,
      category : data.category,
      payed : data.payed,
      assetId : currentAsset
    }
    const res = await store( url, method, body)
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