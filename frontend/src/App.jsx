import React from 'react'
import {Home, About, Account, ShopItem, Cart, Favourites, SignUp, SignIn} from './pages'
import Navbar from './components/Navbar'

import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='flex flex-col relative min-h-screen'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/acc/:uid' element={<Account/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/shop/:id' element={<ShopItem/>}/>
          <Route path='/cart/:uid' element={<Cart/>}/>
          <Route path='/fav/:uid' element={<Favourites/>}/>
          <Route path='/register/su' element={<SignUp/>}/>
          <Route path='/register/si' element={<SignIn/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
