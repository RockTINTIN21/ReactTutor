import { RefObject, useEffect, useRef, useState } from 'react';

type useElementWidthHook = [RefObject<HTMLDivElement>, number];

const useElementWidth = (): useElementWidthHook => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState<number>(0);

	const updateWidth = () => {
		if (ref.current) {
			setWidth(ref.current.clientWidth);
		}
	};

	useEffect(() => {
		if (ref.current) {
			updateWidth();
			const currentRef = ref.current; // Сохраняем текущее значение ref.current
			const resizeObserver = new ResizeObserver(updateWidth);

			resizeObserver.observe(currentRef);

			return () => {
				resizeObserver.unobserve(currentRef);
			};
		}
	}, []);

	return [ref, width];
};

export default useElementWidth;
