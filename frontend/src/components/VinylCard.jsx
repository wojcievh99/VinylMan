import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const VinylCard = (info) => {

  const [isFav, setFav] = useState(false)
  const [isInCart, setCart] = useState(false)

  const [currentFavs, setCurrentFavs] = useState([])
  const [currentCart, setCurrentCart] = useState([])

  const {currentUser} = useContext(UserContext)

  const nav = useNavigate()

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:3141/users/${currentUser.uid}`)
        .then((res) => { 
          setCurrentFavs(res.data.favourites)
          setCurrentCart(res.data.cart)
        })
        .catch((err) => {
          console.error(err)
        })

      currentCart.map((element, _) => {
        if (element._id == info.data._id) setCart(true)
      })
      currentFavs.map((element, _) => {
        if (element._id == info.data._id) setFav(true)
      })
    }
  })

  const addToFavourite = (e) => {
    if (currentUser) {
      if (!isFav) {
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: [...currentFavs, e], cart: currentCart})
          .then((res) => {
            console.log(`Added to favourite, item: ${e._id}`, res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
      else {
        let newFavs = []
        currentFavs.map((element, _) => {
          if (element._id != e._id) newFavs.push(element)
        })
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: newFavs, cart: currentCart})
          .then((res) => {
            console.log(`Removed from favourite, item: ${e._id}`, res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    } else nav('/register/si')
  }

  const addToCart = (e) => {
    if (currentUser) {
      if (!isInCart) {
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: currentFavs, cart: [...currentCart, e]})
          .then((res) => {
            console.log(`Added to cart, item: ${e._id}`)
          })
          .catch((err) => {
            console.error(err)
          })
      }
      else {
        let newCart = []
        currentCart.map((element, _) => {
          if (element._id != e._id) newCart.push(element)
        })
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: currentFavs, cart: newCart})
          .then((res) => {
            console.log(`Removed from cart, item: ${e._id}`)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    } else nav('/register/si')
  }

  return (
    <Link to={`shop/${info.data._id}`} className='bg-black-600 h-80 w-60 flex flex-col items-center py-2 rounded-md 
        text-white transition-colors hover:bg-black mt-10 justify-center
    '>
      <img src={`${info.data.photoUrl}`} alt="" className='max-h-48 max-w-56 rounded-sm'/>
      <p>{info.data.product}</p>
      <p className='text-gray-500 text-center'>{info.data.author}</p>
      <div className='flex px-10 mt-2 w-full items-center justify-between'>
        <p className='text-3xl text-orange-500'>${info.data.price}</p>

        <div className='flex items-center gap-2'>

          <button onClick={() => addToFavourite(info.data)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={isFav ? "icon1 fill-orange-600 text-orange-600 hover:text-white" : "icon1"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <button onClick={() => addToCart(info.data)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={isInCart ? "icon1 text-orange-600 hover:text-white" : "icon1"}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

        </div>
      </div>
    </Link>
  )
}

export default VinylCard
