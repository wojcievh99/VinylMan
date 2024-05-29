import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)

    const {setCurrentUser} = useContext(UserContext)
    const nav = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()

        axios
            .post('http://localhost:3141/users', {username: username, password: password, email: email})
            .then((res) => {
                console.log("Account created.")
                nav('/register/si')
                alert('Account created. Now sign in.')
            })
            .catch((err) => {
                console.error(err)
            })
    }

  return (
    <div className='bg-black-500 h-screen flex flex-col items-center'>
        <p className='mt-10 text-5xl text-white font-mono font-semibold'>
            Sign <span className='text-orange-500'>Up</span>
        </p>
      <form className='flex flex-col text-white gap-1 w-96 mt-10 bg-black-600 py-20 px-5 rounded-xl'
       onSubmit={submitForm}>
        <label htmlFor='inpt1'>username</label>
        <input type='text' id='inpt1' className='regInpt' text={username} onChange={(e) => setUsername(pe => e.target.value)}/>
        <label htmlFor='inpt2'>email</label>
        <input type='email' id='inpt2' className='regInpt' text={email} onChange={(e) => setEmail(pe => e.target.value)}/>
        <label htmlFor='inpt3'>password</label>
        <input type='password' id='inpt3' className='regInpt' text={password} onChange={(e) => setPassword(pe => e.target.value)}/>

        <button className={error 
          ? 'transition-all submitBtn1 active:bg-red-800 active:border-red-800' 
          : 'submitBtn1'}>
          All done!
        </button>
      </form>
    </div>
  )
}

export default SignUp
