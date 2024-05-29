import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const ShopItem = () => {

  const [data, setData] = useState(null)
  const { id } = useParams()

  const [isFav, setFav] = useState(false)
  const [isInCart, setCart] = useState(false)

  const [currentFavs, setCurrentFavs] = useState([])
  const [currentCart, setCurrentCart] = useState([])

  const {currentUser} = useContext(UserContext)

  const nav = useNavigate()

  useEffect(() => {
      if (!data) {
        axios
        .get(`http://localhost:3141/stockItems/${id}`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
      }
    
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
          if (element._id == id) setCart(true)
        })
        currentFavs.map((element, _) => {
          if (element._id == id) setFav(true)
        })
      }
  })

  const addToFavourite = (e) => {
    if (currentUser) {
      if (!isFav) {
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: [...currentFavs, data], cart: currentCart})
          .then((res) => {
            console.log(`Added to favourite, item: ${e}`, res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
      else {
        let newFavs = []
        currentFavs.map((element, _) => {
          if (element._id != e) newFavs.push(element)
        })
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: newFavs, cart: currentCart})
          .then((res) => {
            console.log(`Removed from favourite, item: ${e}`, res)
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
             password: currentUser.password, favourites: currentFavs, cart: [...currentCart, data]})
          .then((res) => {
            console.log(`Added to cart, item: ${e}`, res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
      else {
        let newCart = []
        currentCart.map((element, _) => {
          if (element._id != e) newCart.push(element)
        })
        axios
          .put(`http://localhost:3141/users/${currentUser.uid}`, 
            {username: currentUser.username, email: currentUser.email, 
             password: currentUser.password, favourites: currentFavs, cart: newCart})
          .then((res) => {
            console.log(`Removed from cart, item: ${e}`, res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    } else nav('/register/si')
  }

  return (
    data && 
    <div className='min-h-screen bg-black-500 flex flex-col gap-40 items-center text-white py-20'>
      <div className='flex gap-20'>
        <img src={data.photoUrl} alt="" className='h-96'/>
        <div className='flex flex-col gap-40'>
          <div className='min-w-60'>
            <p className='text-4xl font-semibold'>{data.product}</p>
            <p className='text-xl text-orange-500'>{data.author}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-3xl text-orange-500'>${data.price}</p>
            
            <div className='flex gap-2 items-center'>

            <button onClick={() => addToFavourite(id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={isFav ? "icon1 fill-orange-600 text-orange-600 h-10 w-10 hover:text-white" : "icon1 h-10 w-10"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
            <button onClick={() => addToCart(id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={isInCart ? "icon1 text-orange-600 hover:text-white h-10 w-10" : "icon1 h-10 w-10"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </button>

            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-2/4 bg-black-600 min-h-40 p-10 rounded-xl'>
        <p>{data.desc}</p>
      </div>
    </div>
  )
}

export default ShopItem
