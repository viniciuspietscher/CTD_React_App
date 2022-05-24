/*  HOOK NOTES 
    - This hook uses async/await instead of ES6 notation
*/

import { useState, useEffect } from 'react';

export const useFetchPost = (url, body) => {
  // url: string
  // body: {}
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /* NOTES
       - useEffect only allows synchronous functions to prevent race conditions
       - We can declare an async function within the useEffect, then call it 
    */
    async function post() {
      setLoading(true);
      try {
        const resp = await fetch(url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(body),
        });
        const json = await resp.json();
        setLoading(false);
        setResponse(json);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    post();
  }, [url, body]);

  return {
    response,
    error,
    loading,
  };
};
