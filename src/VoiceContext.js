import React, {useContext, useState, createContext} from 'react' 

export const GanbareCount = createContext()
// export const InterimCount = createContext()

export function GanbareProvider({children}) {
    const [ganbareCount, setGanbareCount] = useState(0)
    // const [interim, setInterim] = useState(0)

    const value = {
        ganbareCount,
        setGanbareCount,
        // interim,
        // setInterim
    }

    return (
        <GanbareCount.Provider value = {value}>
            {children}
        </GanbareCount.Provider>
    )
}

