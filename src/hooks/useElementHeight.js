import { useEffect, useRef, useState } from "react";

const useElementHeight = () => {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    const updateHeight = () => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    };

    useEffect(() => {
        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(ref.current);

        return () => {
            if (ref.current) {
                resizeObserver.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, height];
};

export default useElementHeight;
