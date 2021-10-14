import { useState, useEffect } from 'react';

const useFetch = (url, options, token, initial) => {
    // Call other hook in this function

    const [data, setData] = useState(initial);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            setData(data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => fetchData(), []);

    // Return state and setters

    return { data, error };
};

export default useFetch;
