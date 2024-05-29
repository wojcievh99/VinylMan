import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)

    const {currentUser, setCurrentUser} = useContext(UserContext)
    const nav = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        setError(false)

        axios
        .get('http://localhost:3141/users')
        .then((res) => {
            res.data.data.map((element, _) => {
              if (element.email == email && element.password == password) {
                setCurrentUser({username: element.username, email: email, uid: element._id, password: password})
                nav('/')
              }
            })
            if (!currentUser) setError(true)
        })
        .catch((err) => {
            console.error(err)
            setError(true)
        })
        
    }

  return (
    <div className='bg-black-500 h-screen flex flex-col items-center'>
        <p className='mt-10 text-5xl text-white font-mono font-semibold'>
            Sign <span className='text-orange-500'>In</span>
        </p>
      <form className='flex flex-col text-white gap-1 w-96 mt-10 bg-black-600 py-20 px-5 rounded-xl'
       onSubmit={submitForm}>
        <label htmlFor='inpt4'>email</label>
        <input type='email' id='inpt4' className='regInpt' text={email} onChange={(e) => setEmail(pe => e.target.value)}/>
        <label htmlFor='inpt5'>password</label>
        <input type='password' id='inpt5' className='regInpt' text={password} onChange={(e) => setPassword(pe => e.target.value)}/>

        <button className={error 
          ? 'transition-all submitBtn1 active:bg-red-800 active:border-red-800' 
          : 'submitBtn1'}>
          Let me in!
        </button>
      </form>
    </div>
  )
}

export default SignUp
