import { useState, useEffect } from 'react';

export const useFetch = (url, method, body = null, triggerFetch = false) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (triggerFetch) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const options = {
                        method,
                        body: body instanceof FormData ? body : new URLSearchParams(body).toString(),
                        credentials: "include",
                        //headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                        
                    };

                    // Solo agrega el encabezado 'Content-Type' si el body no es FormData
                    if (!(body instanceof FormData)) {
                        options.headers = {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            //'Authorization': 'Bearer ' + localStorage.getItem('token')
                        };
                    }

                    const response = await fetch(url, options);
                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.error || 'Network response was not ok');
                    }

                    setData(result);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [triggerFetch]);

    
    return { data, loading, error };
};

