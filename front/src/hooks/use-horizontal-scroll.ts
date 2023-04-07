import { useRef, useEffect, useState } from 'react';

const useHorizontalScroll = () => {
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [lastMouseX, setLastMouseX] = useState(0);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!elementRef.current) {
			return;
		}

		const element = elementRef.current;

		const handleMouseDown = (event: MouseEvent) => {
			if (event.target !== element) {
				return;
			}

			event.preventDefault();

			setIsMouseDown(true);
			setLastMouseX(event.clientX);
		};

		const handleMouseUp = () => {
			setIsMouseDown(false);
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (!isMouseDown) {
				return;
			}

			event.preventDefault();

			const deltaX = (event.clientX - lastMouseX) / 2; // divide delta by 2
			element.scrollLeft -= deltaX;
			setLastMouseX(event.clientX);
		};

		element.addEventListener('mousedown', handleMouseDown, { passive: false });
		element.addEventListener('mouseup', handleMouseUp);
		element.addEventListener('mousemove', handleMouseMove, { passive: false });

		return () => {
			element.removeEventListener('mousedown', handleMouseDown);
			element.removeEventListener('mouseup', handleMouseUp);
			element.removeEventListener('mousemove', handleMouseMove);
		};
	}, [elementRef, isMouseDown, lastMouseX]);

	return elementRef;
};

export default useHorizontalScroll;
