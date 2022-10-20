import { useState, useEffect } from "react";

function useDebounced(value, delay) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const TimeOut = setTimeout(() => setDebounced(value), delay);

        return () => clearTimeout(TimeOut);
    }, [value, delay]);

    return debounced;
}

export default useDebounced;
