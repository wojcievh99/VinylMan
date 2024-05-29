import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SearchContextProvider>
  </BrowserRouter>
)
