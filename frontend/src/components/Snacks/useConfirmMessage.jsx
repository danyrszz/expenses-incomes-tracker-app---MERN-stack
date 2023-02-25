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

  const [confirmMessageVisible, setConfirmMessageVisible] = useState(false)

  function showConfirmDialog () { setConfirmMessageVisible(true) }
  function hideConfirmDialog () { setConfirmMessageVisible(false)}

  function handleConfirmation (confirmation, message){
    if(confirmation){
      setConfirmMessageVisible(false)
      changeVisible(true)
    }else{
      setConfirmMessageVisible(false)
      changeVisible(false)
    }
    changeMessage(message)
  }

  return {
      ribbonDuration, showRibbon, ribbonMessage, confirmMessageVisible, handleConfirmation, showConfirmDialog, hideConfirmDialog, changeVisible
  }

}