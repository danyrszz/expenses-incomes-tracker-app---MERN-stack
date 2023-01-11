import { useState } from "react";

export default function useToggle (value=false) {
  const[val, setVal] = useState(value)
  const toggle = ()=> setVal(!val)
  return [val,toggle]
}