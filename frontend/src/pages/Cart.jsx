import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {

  const [data, setData] = useState([])
  const [addFav, setAddFav] = useState([])
  const [total, setTotal] = useState(0)
  const {currentUser} = useContext(UserContext)

  const nav = useNavigate()

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:3141/users/${currentUser.uid}`)
        .then((res) => {
          res.data.cart.map((element, _) => {
            let cond = true
            data.map((el2, _) => {
              if (el2._id == element._id) cond = false
            })
            if (cond) setData(prevData => [...prevData, element])
          })
          setAddFav(res.data.favourites)
        })
        .catch((err) => {
          console.error(err)
        })

      setTotal(0)
      data.map((element, _) => {
        setTotal(prevTotal => prevTotal + element.price)
      })

    } else nav('/register/si')
  })

  const removeFromCart = (item) => {
    let newCart = []
    data.map((element, _) => {
      if (element._id != item._id) newCart.push(element)
    })
      axios
        .put(`http://localhost:3141/users/${currentUser.uid}`, 
        {username: currentUser.username, email: currentUser.email, 
          password: currentUser.password, favourites: addFav, cart: newCart})
        .then((res) => {
          console.log(`Removed from cart item: ${item._id}`, res)
        })
        .catch((err) => {
          console.error(err)
        })
  }

  return ( 
    <div className='bg-black-500 min-h-screen flex flex-col gap-20 p-20 items-center'>
      <p className='text-white font-bold text-3xl'>Your cart is here!</p>
      <div className='flex flex-col bg-orange-400 py-20 rounded-3xl'>
          { data.length < 1 ? 
          <div className='flex flex-col px-10 text-white items-center font-semibold text-xl'>
            <p>Oops... your cart looks to be empty.</p>
            <p>
              Go back to the <Link to='/' className='underline transition-all hover:no-underline'>shop</Link>.
            </p>
          </div>
          :
          data.map((element, index) => 
            <Link to={`/shop/${element._id}`} key={index} className='flex items-center m-5 p-2 bg-orange-600 rounded-xl
            text-white font-mono justify-between gap-10 transition-colors hover:bg-orange-700'>
              <div className='flex items-center gap-5 min-w-96'>
                <img src={element.photoUrl} alt="" className='h-32 w-32'/>
                <p>{element.product}</p>
              </div>
              <div className='flex items-center gap-5'>
                <button onClick={() => removeFromCart(element)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 transition-colors hover:text-red-800 active:fill-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                <p className='text-2xl min-w-20 flex justify-center'>${element.price}</p>
              </div>
            </Link>
          )}
      </div>
      <div className='bg-orange-600 flex py-10 px-20 items-center justify-between
      rounded-xl text-white w-full'>
        <p>Total: <span className='font-mono font-semibold text-xl'>${total}</span></p>
        <button className='px-20 py-2 bg-transparent border-2 rounded-full
        transition-all ease-linear hover:bg-orange-900 hover:border-orange-600 '>
          Go to checkout
        </button>
      </div>
    </div>
  )
}

export default Cart