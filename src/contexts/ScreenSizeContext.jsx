import {createContext, useEffect, useState} from "react";

export const ScreenSizeContext = createContext();

export function ScreenSizeProvider({ children }) {
    const [clientWindowSize, setClientWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [mainContentSize,setMainContentSize] = useState([0,0]);
    const [navbarHeight,setNavbarHeight] = useState(0);
    // useEffect(() => {
    //     console.log('clientWindowSize:',clientWindowSize)
    //     console.log('mainContentSize:',mainContentSize)
    //     console.log('navbarHeight:',navbarHeight)
    // },[clientWindowSize,mainContentSize,navbarHeight])
    useEffect(() => {
        const resizeHandler = () => setClientWindowSize([window.innerWidth, window.innerHeight])
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', () => resizeHandler);
        }
    },[])
    return(
        <ScreenSizeContext.Provider value={{clientWindowSize, mainContentSize,setMainContentSize,setNavbarHeight,navbarHeight}}>
            {children}
        </ScreenSizeContext.Provider>
    )
}