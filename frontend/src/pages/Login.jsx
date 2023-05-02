import useAuth from "../utils/useAuth"
import Loading from "../components/Loading"
import "./Login.css"

export default function Login(){
  
  const {login, loggingIn} = useAuth()
  return (
    <>
      {loggingIn ?( 
        <Loading></Loading>
      ) : (
        <div className="login-wrapper flex-centered">
          <div className="card login-page flex-centered">
            <form onSubmit={ e => login(e) } className="login-form">
              <input type="password" name="" id="" />
              <input type="submit" value="Iniciar Sesion"/>
            </form>
          </div>
        </div>
      )}
    </>
  )
}