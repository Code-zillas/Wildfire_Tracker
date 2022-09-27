import { useState, useRef } from 'react'
import axios from 'axios'
import image from '../.././assets/cancel.png'

function Signup({ setShowSignup }) {
  const [successSignup, setSuccessSignUp] = useState(false)
  const [failureSignup, setFailureSignUp] = useState(false)

  //store user information (username, email) password from sign up account form
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  //when user submit sign up form information from user inputs send to server

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      await axios.post('/users/signup', newUser)
      setFailureSignUp(false)
      setSuccessSignUp(true)
    } catch (error) {
      setFailureSignUp(true)
      console.log(error)
    }
  }

  return (
    <div className='wrapper'>
      <div className='signup-wrapper'>
        <p className='signup-header'>Create an account</p>
        {/* if new account was created than show successful message*/}
        {successSignup && (
          <span className='success'>
            Succeed! You can login in your account.
          </span>
        )}
        {/* if new account wasn't created than show failure message */}
        {failureSignup && (
          <span className='failure'>Oops! Something went wrong.</span>
        )}
        <form className='signup-form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Username' ref={usernameRef} />
          <input type='email' placeholder='Email Address' ref={emailRef} />
          <input type='password' placeholder='Password' ref={passwordRef} />
          <button type='submit' className='signup-button'>
            Sign Up
          </button>
        </form>
        <img
          src={image}
          alt='cancel'
          className='signup-cancel'
          onClick={() => setShowSignup(false)}
        />
      </div>
    </div>
  )
}

export default Signup
