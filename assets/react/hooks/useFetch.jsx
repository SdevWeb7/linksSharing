import React, { useEffect, useState } from "react";

export const useFetch = (url, method = 'GET', headers = {}, body = {}) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(url, {
               method: method,
               headers: headers,
               body: JSON.stringify(body),
            });

            if (!response.ok) {
               throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result = await response.json();
            setData(result);
         } catch (e) {
            setError(e.message || 'Une erreur inattendue s\'est produite.');
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [url, method, headers, body]);

   return {
      data,
      loading,
      error,
   };
}