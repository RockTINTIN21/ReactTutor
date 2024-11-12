import { RefObject, useEffect, useRef, useState } from "react";

type useElementWidthHook = [RefObject<HTMLElement>, number];
const useElementWidth = (): useElementWidthHook => {
    const ref = useRef<HTMLElement>(null!);
    const [width, setWidth] = useState<number>(0);

    const updateWidth = () => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    };

    useEffect(() => {
        if(ref.current){
            updateWidth();
            const resizeObserver = new ResizeObserver(updateWidth);

            resizeObserver.observe(ref.current!);

            return () => {
                if(ref.current){
                    resizeObserver.unobserve(ref.current!);
                }

            };
        }

    }, []);

    return [ref, width];
};

export default useElementWidth;