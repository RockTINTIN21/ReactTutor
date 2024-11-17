import {RefObject, useEffect, useRef, useState} from 'react';

type UseElementHeightHook = [RefObject<HTMLDivElement>,number];

const useElementHeight = (): UseElementHeightHook => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState<number>(0);

	const updateHeight = () => {
		if (ref.current) {
			setHeight(ref.current.clientHeight);
		}
	};

	useEffect(() => {
		updateHeight();

		const resizeObserver = new ResizeObserver(updateHeight);
		if(ref.current){
			resizeObserver.observe(ref.current);
		}
		return () => {
			if (ref.current) {
				resizeObserver.unobserve(ref.current);
			}
		};
	}, []);

	return [ref, height];
};

export default useElementHeight;
