import { useState } from 'react'
import useRibbon from './useRibbon'

export default function useConfirmMessage(){

  const {
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeVisible,
    changeMessage
  } = useRibbon()

  const [dialogVisible, setDialogVisible] = useState(false)

  function showConfirmDialog () { setDialogVisible(true) }

  function handleConfirmation (confirmation, message){
    if(confirmation){
      setDialogVisible(false)
      changeVisible(true)
    }else{
      setDialogVisible(false)
      changeVisible(false)
    }
    changeMessage(message)
  }

  return {
      ribbonDuration, showRibbon, ribbonMessage, dialogVisible, handleConfirmation, showConfirmDialog, changeVisible
  }

}