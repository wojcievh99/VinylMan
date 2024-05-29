import React, { useState } from 'react'
import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

const SearchBar = () => {

  const [isOpen, setIsOpen] = useState(false) 
  const {setCurrentSearch} = useContext(SearchContext)

  return (
    <div className='relative group'>
      <div className={ isOpen ? 'searchInpt h-16' : 'searchInpt h-8'} 
      onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
          <div className={ isOpen ? 'flex transition-all scale-100 gap-1' 
            : 'flex transition-all scale-0 gap-1'}>
              <input className='outline-none transition-all bg-orange-900
              group-hover:bg-orange-800 rounded-md px-1 min-w-80
              group-hover:placeholder:text-orange-500 placeholder:font-mono
              text-white placeholder:text-orange-600 placeholder:transition-colors' 
              placeholder='Write To Search' onChange={(e) => setCurrentSearch(e.target.value)}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
          </div>
          <p className='text-orange-500 transition-all w-12 flex justify-center'>
            {isOpen ?  
              'Search'
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-white cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
              </svg>
            }
          </p>
      </div>
      <div className={ isOpen ? 'scale-100 clickToHideSearch' : 'scale-0 top-8 clickToHideSearch'}
          onClick={() => {setIsOpen(false); setCurrentSearch('')}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
            </svg>
      </div>
    </div>
  )
}

export default SearchBar
