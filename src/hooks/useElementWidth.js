import {useEffect, useRef, useState} from "react";

const useElementWidth = () => {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    const updateWidth = () => {
        if(ref.current) {
            setWidth(ref.current.clientWidth);
        }
    };
    useEffect(() => {
        updateWidth();
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(ref.current);
        return () => {
            if (ref.current) {
                resizeObserver.unobserve(ref.current);
            }
        };
    },[])
    return [ref,width]
};
export default useElementWidth;