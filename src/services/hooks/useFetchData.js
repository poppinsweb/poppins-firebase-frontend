import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función de carga reutilizable
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const request = await axios.get(endpoint);
      setData(request.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Se ejecuta al montar el componente y cada vez que cambie `endpoint`
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Retorna también refetch
  return { data, loading, error, refetch: fetchData };
};

export { useFetchData };
