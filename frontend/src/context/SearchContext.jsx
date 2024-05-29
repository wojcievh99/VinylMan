import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    
    const [currentSearch, setCurrentSearch] = useState('')

    return (
        <SearchContext.Provider value={{currentSearch, setCurrentSearch}}>
            {children}
        </SearchContext.Provider>
    )
}