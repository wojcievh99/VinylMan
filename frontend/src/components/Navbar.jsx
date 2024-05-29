import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import VinylManLogo from '../../public/VinylManLogo.png'

const Navbar = () => {

  const {currentUser} = useContext(UserContext)

  return (
    <div className='sticky z-50 top-0 bg-black-600 h-24 text-orange-600 flex 
        items-center px-20 pr-1 font-semibold
    '>
      <div className='flex-1'>
        <Link to='/' className='flex mt-5 max-w-40'>
          <img src={VinylManLogo} alt="" className='h-16'/>
        </Link>
      </div>
      <div className='flex-1 flex gap-10'>
        <Link to='/' className='transition-all hover:text-white'>Home</Link>
        <Link to='/about' className='transition-all hover:text-white'>About</Link>
      </div>
      {currentUser ? 
        <div className='flex group items-center text-white gap-4 px-5 pl-0'>
          <div className='flex transition-all gap-2 scale-0 group-hover:scale-100
          origin-right ease-linear bg-black-500 rounded-xl p-2'>
            <Link to={`/fav/${currentUser.uid}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 transition-colors hover:fill-orange-500 hover:text-orange-500 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </Link>
            <Link to={`/cart/${currentUser.uid}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 transition-colors hover:fill-orange-500 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <Link to={`/acc/${currentUser.uid}`} className='border-2 transition-all rounded-full
            border-orange-600 group-hover:border-black p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
            <p className='text-xs scale-0 group-hover:scale-100 transition-all origin-left
            bg-black-500 p-2 rounded-xl'>
              Usn: <span className='text-sm'>{currentUser.username}</span>
            </p>
          </div>
        </div>
        : 
        <div className='flex gap-5 text-white mr-5 items-center'>
          <Link to='/register/su' className='transition-colors hover:text-orange-600'>SignUp</Link>
          <Link to='/register/si' className='transition-colors hover:text-orange-600 bg-orange-600
          p-2 rounded-md hover:bg-white'>
            SignIn
          </Link>
        </div>
      }
    </div>
  )
}

export default Navbar
