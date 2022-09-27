import { useState, useRef } from 'react'
import axios from 'axios'
import image from '../.././assets/cancel.png'

function Login({ setShowLogin, localStorage, setCurrentUser }) {
  const [failureSignup, setFailureSignUp] = useState(false)

  //store user information (username, password} from login account form
  const usernameRef = useRef()
  const passwordRef = useRef()

  //send request to server
  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(user)
    try {
      const res = await axios.post('/users/login', user)
      setCurrentUser(res.data.username)
      localStorage.setItem('user', res.data.username)
      setShowLogin(false)
    } catch (error) {
      setFailureSignUp(true)
      console.log(error)
    }
  }

  return (
    <div className='wrapper'>
      <div className='login-wrapper'>
        <p className='login-header'>Login</p>
        <form onSubmit={handleSubmit} className='login-form'>
          <input autoFocus placeholder='Username' ref={usernameRef} />
          <input
            type='Password'
            min='6'
            placeholder='Password'
            ref={passwordRef}
          />
          <button className='login-button' type='submit'>
            Login
          </button>
          {failureSignup && (
            <span className='failure'>Oops! Wrong password.</span>
          )}
        </form>
        <img
          src={image}
          alt='cancel'
          className='login-cancel'
          onClick={() => setShowLogin(false)}
        />
      </div>
    </div>
  )
}

export default Login
