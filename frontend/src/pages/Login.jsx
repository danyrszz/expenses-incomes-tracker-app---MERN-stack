import useAuth from "../utils/useAuth"
import "./Login.css"

export default function Login(){
  
  const {login} = useAuth()
  return (
    <div className="login-wrapper flex-centered">
      <div className="card login-page flex-centered">
        <form onSubmit={ e => login(e) } className="login-form">
          <input type="password" name="" id="" />
          <input type="submit" value="Iniciar Sesion"/>
        </form>
      </div>
    </div>
  )
}