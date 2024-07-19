import { useState } from 'react'
import { Register } from "../../components/Register.jsx"
import { Login } from "../../components/Login.jsx"

export const AuthPage = () => {
  const [isLogin, setIslogin] = useState(true)
  const handleAuthPage = ()=>{
      setIslogin((prev)=> !prev)
  }
  return(
      <div className="auth-container">
          {
              isLogin ? (
                  <Login switchAuthHandler={handleAuthPage}/>
              ) : (
                  <Register switchAuthAndler={handleAuthPage}/>
              )
          }
      </div>
  )
}

