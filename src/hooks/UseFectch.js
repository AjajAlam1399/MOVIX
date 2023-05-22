import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../services/Api';
import { json } from 'react-router-dom';

export const useFetch = (url) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading('loading...');
        setData(null);
        setError(null);

        fetchDataFromApi(url).then(resp => {
            setLoading(false);
            setData(resp);
        }).catch(error => {
            setLoading(false);
            setError("Something went wrong");
        })
    }, [url]);

    return { data, loading, error };
}
