import {useEffect, useRef, useState} from "react";

const useElementHeight = () => {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if(ref.current) {
                setHeight(ref.current.clientHeight);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {window.removeEventListener('resize', updateHeight);}
    },[])
    return [ref,height]
};