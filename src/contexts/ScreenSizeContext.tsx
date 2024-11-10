import React from "react";
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
type ScreenSizeContextType = {
    clientWindowSize: [number, number];
    mainContentSize: [number, number];
    setMainContentSize: Dispatch<SetStateAction<[number,number]>>;
    navbarHeight: number;
    setNavbarHeight: Dispatch<SetStateAction<number>>;
}
export const ScreenSizeContext = createContext<ScreenSizeContextType | null>(null);

interface ScreenSizeProviderProps {
    children: ReactNode;
}

export function ScreenSizeProvider({children}: ScreenSizeProviderProps) {
    const [clientWindowSize, setClientWindowSize] = useState<[number,number]>([window.innerWidth, window.innerHeight]);
    const [mainContentSize,setMainContentSize] = useState<[number,number]>([0,0]);
    const [navbarHeight,setNavbarHeight] = useState<number>(0);
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