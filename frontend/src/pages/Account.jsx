import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Account = () => {

  const {currentUser, setCurrentUser} = useContext(UserContext)
  const nav = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:3141/users/${currentUser.uid}`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    else nav('/register/si')
  }, [])

  const logOut = () => {
    setCurrentUser(null)
    nav('/')
  }

  return (
    currentUser &&
    <div className='bg-black-500 pb-10 min-h-screen flex flex-col items-center gap-40'>
      <div className='mt-20 px-20 py-10 rounded-xl bg-black-600 flex flex-col 
      font-mono items-center gap-5 border-2'>
        <p className='text-white flex items-center gap-2'>
          username: <span className='text-3xl font-semibold'>{data.username}</span>
        </p>
        <p className='text-white flex items-center gap-2'>
          email: <span className='text-3xl font-semibold'>{data.email}</span>
        </p>
        <p className='text-white flex items-center gap-2'>
          created at: <span className='text-3xl font-semibold'>{data.createdAt}</span>
        </p>
        <button onClick={logOut} className='px-10 py-2 bg-orange-500 
        transition-all text-white rounded-xl border-2 border-orange-500 
        text-lg font-sans hover:border-white hover:px-20'>
          Log Out
        </button>
      </div>
      <div className='mx-20 text-white flex flex-col items-center gap-10'>
        <p className='text-2xl text-orange-600 font-semibold'>Terms of policy:</p>
        <p className='text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse, quod cupiditate repudiandae rerum libero eum nostrum voluptas voluptatibus a consectetur nesciunt fugit! Corrupti facilis explicabo reiciendis! Similique, ut deleniti!  
        </p>
      </div>
    </div>
  )
}

export default Account
