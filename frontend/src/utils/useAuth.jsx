import { saveData as fetch } from "./fetch";
import { useNavigate } from "react-router-dom";
import { endpoints } from "./endpoints";
import { useState } from "react";

export default function useAuth (){

  const navigate = useNavigate()
  const [loggingIn, setLoggingIn] = useState(false)

  async function login(e){
    e.preventDefault()
    setLoggingIn(true)
    const password = e.target[0].value
    if(!password) return alert("Escribe una contraseña.")
    const response = await fetch(
      endpoints.login(),
      'POST',
      {password : password}
    )
    if(response.signedIn){
      localStorage.setItem('token', response.token)
      navigate("/")
    }else{
      setLoggingIn(false)
      return alert("La constraseña es incorrecta.")
    }
  }

  function logout (){
    localStorage.removeItem('token')
    setLoggingIn(false)
    navigate('/login')
  }

  return {login, logout, loggingIn}
}