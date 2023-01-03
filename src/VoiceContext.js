import React, {useContext, useState, createContext} from 'react' 

// const GanbareCount = React.createContext
// const GanbareUpdater = React.createContext

// export function useGanbareCount() {
//     return useContext(GanbareCount)
// }

// export function useGanbareUpdater() {
//     return useContext(GanbareUpdater)
// }

export const GanbareCount = createContext()

export function GanbareProvider({children}) {
    const [ganbareCount, setGanbareCount] = useState(0)

    // function ganbareUpdater(given_value) {
    //     setGanbareCount(given_value)
    // }

    const value = {
        ganbareCount,
        setGanbareCount,
    }

    return (
        <GanbareCount.Provider value = {value}>
            {children}
        </GanbareCount.Provider>
    )

    // return (
    //     <GanbareCount.Provider value = {ganbareCount}>
    //         <GanbareUpdater.Provider value = {ganbareUpdater}>
    //             {children}
    //         </GanbareUpdater.Provider>
    //     </GanbareCount.Provider>
    // )
}

