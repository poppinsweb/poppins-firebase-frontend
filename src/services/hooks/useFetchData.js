import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (endpoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const request = await axios.get(endpoint);
        setData(request.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);
  
  return { data, loading, error };
};

export {useFetchData};
