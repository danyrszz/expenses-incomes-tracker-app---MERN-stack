import { useEffect } from 'react'
import './styles/Ribbon.css'
export default function Ribbon({visible, onClose, success, duration, children}){
  
  useEffect(()=>{
    if(visible){
      const timer = setTimeout(() => {
        onClose()
        if(!visible) clearTimeout(timer)
      }, duration)
    }
  })

  return(
    <div className= 
      {`ribbon ${success?'ribbon-yes':'ribbon-no'} flex-row ${visible?'ribbon-opened':'ribbon-closed'}`} 
      onClick={onClose}>
      <span class="material-symbols-outlined">
      {success?'check_circle':'error'}
      </span>
      {children}
    </div>
  )
}