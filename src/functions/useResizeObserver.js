import { useEffect } from 'react';
import { debounce } from 'lodash';

const useResizeObserver = (targetRef, callback, delay = 100) => {
    useEffect(() => {
        const handleResize = debounce(() => {
            if (callback && targetRef.current) callback(targetRef.current);
        }, delay);

        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => handleResize());
        });

        if (targetRef.current) {
            resizeObserver.observe(targetRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            handleResize.cancel(); // Clear debounce
        };
    }, [targetRef, callback, delay]);
};

export default useResizeObserver;