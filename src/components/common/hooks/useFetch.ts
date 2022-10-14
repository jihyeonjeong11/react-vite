import { useEffect, useState } from "react";

interface FetchResponseData<T> {
    response: Response<T>;
    error: string | null;
    loading: boolean;
}

interface Response<T> {
    data: T | null;
    totalCount?: number;
}

const DEFAULT_RESPONSE_STATE = {
    data: null,
}

/**
 * @param endpoint url 엔드포인트
 */

export function useFetch<T>(endpoint: string): FetchResponseData<T> {
    const [response, setResponse] = useState<Response<T>>(DEFAULT_RESPONSE_STATE);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let didCancelFetch = false;

        // new loading start
        setError(null);
        setLoading(true);

        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_TEST_ENDPOINT}${endpoint}`)
                const responseJson = await res.json()

                if(!didCancelFetch){
                    const updatedResponse: Response<T> = {data: responseJson}
                    if(res.headers.get('X-Total-Count') !=null) {
                        updatedResponse.totalCount = Number(
                            res.headers.get('X-Total-Count')
                        );
                    }

                    setResponse(updatedResponse)
                }
            } catch(err: any) {
                setError(err.message || 'errors')
            }
            setLoading(false);
        };

        fetchData();

        return () => {
            didCancelFetch = true;
        };
    }, [endpoint]);

    return {response, error, loading};
}