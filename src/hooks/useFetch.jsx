import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = url => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const apiOptions = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '03517ba7e0mshee9d9995763f0abp1e52eejsn69b5b3eac705',
    //         'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    //     }
    // };

    // const apiOptions = {
        // method: 'GET',
        // headers: {
        //     'X-RapidAPI-Key': '03517ba7e0mshee9d9995763f0abp1e52eejsn69b5b3eac705',
        //     'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
        //     'key': '767d3e075bf24c058c4a5c1a63b98ebc'
        // }
    // };

    const apiOptions = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '03517ba7e0mshee9d9995763f0abp1e52eejsn69b5b3eac705',
          'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        }
      };
    

    const doFetch = useCallback(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            return;
        }
        const fetchData = async () => {
            try {
                const res = await axios(url, apiOptions);
                setResponse(res.data);
            } catch (err) {
                const data = err.response ? err.response.data : 'Error en el servidor';
                setError(data);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [isLoading, apiOptions, url]);

    return [{ response, error, isLoading }, doFetch];
}

export default useFetch;