import { useState } from "react";

export default function useToggle ({value}) {
  const[toggler, setToggler] = useState(value)
  
  function toggle(){
    setToggler(!toggler)
  }
  return toggler, toggle
}