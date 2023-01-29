import { useState } from 'react'
export default function useRibbon(){

  const [ribbonDuration, setRibbonDuration] = useState(2000) 
  const [showRibbon, setShowRibbon] = useState(false)
  const [ribbonMessage, setRibbonMessage] = useState('')

  function changeDuration (miliseconds) {setRibbonDuration(miliseconds)}
  function changeVisible (visible) { setShowRibbon(visible) }
  function changeMessage (message) { setRibbonMessage(message) }

  return {
    ribbonDuration,
    showRibbon,
    ribbonMessage,
    changeDuration,
    changeVisible,
    changeMessage
  }
}