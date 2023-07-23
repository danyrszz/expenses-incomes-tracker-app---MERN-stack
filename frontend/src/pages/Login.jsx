import "./Login.css"
import Loading from "../components/Loading"

export default function Login({login, loading}){
  
  return (
    <>
      {loading ?( 
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