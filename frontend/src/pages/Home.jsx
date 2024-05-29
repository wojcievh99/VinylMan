import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import VinylCard from '../components/VinylCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'

const Home = () => {

  const [allData, setAllData] = useState([])
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')

  const {currentSearch} = useContext(SearchContext)
  const [prevSearch, setPrevSearch] = useState('')

  const nav = useNavigate()

  useEffect(() => {
    if (allData.length < 1) {
      axios 
        .get('http://localhost:3141/stockItems')
        .then((res) => {
          setData(pd => res.data.data)
          setAllData(pad => res.data.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (currentSearch != prevSearch) {
      setPrevSearch(currentSearch)
      let newData = []
      allData.map((element, _) => {
        let cond = true
        currentSearch.split('').map((letter, i) => {
          if (element.product[i] != letter && element.author[i] != letter) cond = false
        })
        if (cond) newData.push(element)
      })
      setData(newData)
    } 
  })

  const filterData = (e) => {
    setFilter(e)
    if (e != '') {
      let newData = []
      allData.map((element, _) => {
        if (element.filters.includes(e)) newData.push(element)
      })
      setData(newData)
      nav('/')
    } else {
      setData(allData)
    }
  }

  return (
    <div className='flex flex-col bg-black-500'>
      <SearchBar/>
      <div>
        <div className='flex gap-5 text-orange-800 px-10 py-2 font-semibold bg-black-600'>
          <p className='text-gray-500'>Filters: </p>
          <button className={ filter == '' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'} 
          onClick={() => filterData('')}>
            All
          </button>
          <button className={ filter == 'rock' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'} 
          onClick={() => filterData('rock')}>
            Rock
          </button>
          <button className={ filter == 'pop' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'}  
          onClick={() => filterData('pop')}>
            Pop
          </button>
          <button className={ filter == 'blues' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'}  
          onClick={() => filterData('blues')}>
            Blues
          </button>
          <button className={ filter == 'soul' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'} 
          onClick={() => filterData('soul')}>
            Soul
          </button>
          <button className={ filter == 'reggae' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'} 
          onClick={() => filterData('reggae')}>
            Reggae
          </button>
          <button className={ filter == 'classics' 
          ? 'transition-colors text-orange-500' : 'transition-colors hover:text-orange-600'} 
          onClick={() => filterData('classics')}>
            Classics
          </button>

        </div>
        <div className='min-h-screen px-20 pb-40 grid 2xl:grid-cols-6 xl:grid-cols-4'>
          {data.map((element, index) => 
            <VinylCard key={index} data={{product: element.product, author: element.author,
              desc: element.desc, price: element.price, 
              photoUrl: element.photoUrl, filters: element.filters, _id: element._id}}/>
          )}
          </div>
      </div>
    </div>
  )
}

export default Home
