import { saveData as fetch } from "./fetch";
import { useNavigate } from "react-router-dom";
import { endpoints } from "./endpoints";

export default function useAuth (){

  const navigate = useNavigate()

  async function login(e){
    e.preventDefault()
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
      return alert("La constraseña es incorrecta.")
    }
  }

  function logout (){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return {login, logout}
}