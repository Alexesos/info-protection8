import { useCallback } from "react";

const Service = () => {
    const _apiBase = import.meta.env.VITE_API_BASE;

    const makeRequest = useCallback(
        async (endpoint, body) => {
            try {
                const response = await fetch(`${_apiBase}${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error("API request failed:", error);
                throw error;
            }
        },
        [_apiBase]
    );

    const getHashCs = async (message) => {
        const data = await makeRequest('/hash/cs', { message });
        return data.hash;
    }
    
    const hashCsCheck = async (message, hash) => {
        const data = await makeRequest('/check/cs', { message, hash });
        return data.isValid;
    }

    const getHashMs = async (message) => {
        const data = await makeRequest('/hash/ms', { message });
        return data.hash;
    }

    const hashMsCheck = async (message, hash) => {
        const data = await makeRequest('/check/ms', { message, hash });
        return data.isValid;
    }

    const getHashMod = async (message) => {
        const data = await makeRequest('/hash/mod', { message });
        return data.hash;
    }

    const hashModCheck = async (message, hash) => {
        const data = await makeRequest('/check/mod', { message, hash });
        return data.isValid;
    }

    const getHashMpsc = async (message) => {
        const data = await makeRequest('/hash/mpsc', { message });
        return data.hash;
    }

    const hashMpscCheck = async (message, hash) => {
        const data = await makeRequest('/check/mpsc', { message, hash });
        return data.isValid;
    }
    
    return { 
        getHashCs, 
        hashCsCheck, 
        getHashMs, 
        hashMsCheck, 
        getHashMod, 
        hashModCheck, 
        getHashMpsc,
        hashMpscCheck
    };
};

export default Service;