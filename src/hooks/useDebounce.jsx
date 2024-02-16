import { useEffect, useState } from "react";

/**
 * Хук возвращает новое debounced-значение после задержки.
 *
 * @param {any} value - значение для debounce.
 * @param {number} delay - задержка в милисекундох.
 * @returns {any} debounced-значение
 */
export default function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
