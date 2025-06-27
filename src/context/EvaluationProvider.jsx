import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useChild } from "./ChildProvider";

export const EvaluationContext = createContext();

// **************************************************************
// HOOK PARA LLAMAR A ESTE CONTEXTO
export const useEvaluation = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error("useEvaluation must be used within an EvaluationProvider");
  }
  return context;
};
// ********************************************************************

export const EvaluationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completEvaluation, setCompletEvaluation] = useState([]);
  const { data: dataChild } = useChild();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await axios.get(`${import.meta.env.VITE_API_URL}/completevaluations`,
          {withCredentials: true}
        );

        if (dataChild) {
          const filteredResponses = responses.data.filter(
            response => response.evaluationtoken === dataChild.evaluationtoken
          );
          setCompletEvaluation(filteredResponses);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (dataChild) {
      fetchData();
    }
  }, [dataChild]);

  return (
    <EvaluationContext.Provider
      value={{
        loading,
        error,
        completEvaluation,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};
