import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchData } from './fetch'
import { endpoints } from './endpoints'

export default function useVerifyLogin(token){

  const navigate = useNavigate()

  useEffect(()=>{
    checkLogin(token).then((res)=>{
      if(!res) navigate("/")
    })
  },[])

  async function checkLogin (token){
    if(!token) return false
    const response = await fetchData( endpoints.checkLogin(), 'POST', token )
    if(response.loggedIn) return true
    return false
  }

  return {checkLogin}

}