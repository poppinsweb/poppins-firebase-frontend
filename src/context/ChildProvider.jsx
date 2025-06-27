import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const ChildContext = createContext();

export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error("useChild must be used within a ChildProvider");
  }
  return context;
};

export const ChildProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const location = useLocation();
  
  const { evaluationtoken } = (location && location.state) || {};

  useEffect(() => {
    const fetchChildData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/childrenres`, 
          { withCredentials: true } // Include credentials for session management 
        );
        const childData = response.data.find(
          (child) => child.evaluationtoken === evaluationtoken
        );

        if (!childData) {
          setError("No matching child data found");
          setData(null);
        } else {
          setData(childData);
          setError(null);
        }
      } catch (error) {
        setError(`Error loading children data: ${error.message}`);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (evaluationtoken) {
      fetchChildData();
    }
  }, [evaluationtoken]);

  return (
    <ChildContext.Provider value={{ loading, error, data }}>
      {children}
    </ChildContext.Provider>
  );
};
