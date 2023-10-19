import React, { useState, useContext } from 'react' // 10 added useContext
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js' // 10


const initInputs = { username: "", password: "" }

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)


  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext) // 10 => gets object = user, token, todo so use const userData = ... BUT we are destructuring so we can just use the signup function
  // 18. added errMsg
  // 18.2 resetAuthErr
  
  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e) {
    e.preventDefault()
    // signup
    signup(inputs) // 10. inputs coming from
  }

  function handleLogin(e) {
    e.preventDefault()
    // login
    login(inputs)// 10
  }

  // 18.2
  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="auth-container">
      <h1>Todo App</h1>
      {!toggle ?
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}// 18. errMsg
          />
          {/* 18.2 toggleform */}
          <p onClick={toggleForm}>Already a member?</p> 
        </>
        :
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}// 18. errMsg
          />
          {/* 18.2 toggleform */}
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}