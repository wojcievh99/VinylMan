import React, { useContext } from 'react'
import VinylManLogo from '../../public/VinylManLogo.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Footer = () => {

    const {currentUser} = useContext(UserContext)

  return (
    <div className='bg-black-600 flex h-60 justify-between px-10 py-10 text-white'>
      <div className='flex flex-col items-center'>
        <img src={VinylManLogo} alt="" className='h-16'/>
        <div className='flex flex-col items-center bg-orange-900 p-5 gap-2 rounded-xl'>
            <Link to='/about' className='font-semibold text-orange-300 hover:text-white transition-colors'>
                About
            </Link>
            {currentUser 
            ? <Link to={`/acc/${currentUser.uid}`} className='font-semibold text-orange-300 hover:text-white transition-colors'>
                Account
              </Link>
            : <Link to='/register/si' className='font-semibold text-orange-300 hover:text-white transition-colors'>
                Sign In
              </Link>

            }
            <Link to='/' className='font-semibold text-orange-300 hover:text-white transition-colors'>
                Home
            </Link>
        </div>
      </div>
      <div className='flex flex-col items-center p-6 bg-orange-900 rounded-xl'>
        <p className='font-semibold text-orange-300'>Where else to find us:</p>
            <li className='w-24'>Facebook</li>
            <li className='w-24'>Instagram</li>
            <li className='w-24'>Twitter</li>
            <li className='w-32'>tel.: 1234-567</li>
      </div>
    </div>
  )
}

export default Footer
