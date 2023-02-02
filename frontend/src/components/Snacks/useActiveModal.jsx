import { useEffect } from 'react'

export default function useActiveModal(visible, modalWrapper){
  
  useEffect(()=>{
    if(visible){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "";
    }
  },[visible])

}