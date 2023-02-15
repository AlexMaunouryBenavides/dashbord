import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetch the user's data from the server
 * @param {url} url - url from source
 * @returns a promise with data, loading or error
 */
function useFetch(url) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      axios
         .get(url)
         .then((response) => {
            setData(response.data);
         })
         .catch((err) => {
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         });
   }, [url]);

   return { data, loading, error };
}

export default useFetch;
