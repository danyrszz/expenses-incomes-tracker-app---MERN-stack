import { useEffect } from 'react'

export default function useActiveModal(visible){
  
  useEffect(()=>{
    if(visible){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "";
    }
  },[visible])

}