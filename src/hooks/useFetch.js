/*  HOOK NOTES 
    - We must follow React convention with useEffect, useState, etc because
      this code still runs inside of a component.
    - The code is just removed slightly from the component, but remember the
      component itself still calls the function, so data is not persisted unless
      we let react manage variables and re-renders
*/

import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  /* NOTES
     - Another approach might have been to evaluate the truthiness of the
       response object, but what if the response was valid but empty, or a
       falsy value like 0 or "". This way we have more explicit control
       over what is returned, but we must be sure to setLoading appropriately
  */

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        setLoading(false);
        setResponse(json);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [url]);
  /* NOTES
     - When an item in the dependency array changes, then the anonymous function
       runs
     - If the array is empty, it only runs when the component initially mounts
     - If it is omitted, it runs every time the component re-renders
  */

  return {
    response,
    error,
    loading,
  };
};
