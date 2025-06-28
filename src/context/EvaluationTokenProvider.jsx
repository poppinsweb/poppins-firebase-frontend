import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
export const EvaluationTokenContext = createContext();

// **************************************************************
// HOOK PARA LLAMAR A ESTE CONTEXTO
export const useEvaluationToken = () => {
  const context = useContext(EvaluationTokenContext);
  if (!context) {
    throw new Error("useEvaluationToken must be used within an EvTokenProvider");
  }
  return context;
};
// ********************************************************************

export const EvaluationTokenProvider = ({ children }) => {
  const [evaluTokens, setEvaluTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvaluTokens = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tokens`, {
        withCredentials: true,
      });
      setEvaluTokens(response.data.tokens);
    } catch (err) {
      setError(err.message || "Error fetching tokens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluTokens();
  }, [])

  return (
    <EvaluationTokenContext.Provider
      value={{
        loading,
        error,
        evaluTokens,
        fetchEvaluTokens,
      }}
    >
      { children }
    </EvaluationTokenContext.Provider>
  );
};
