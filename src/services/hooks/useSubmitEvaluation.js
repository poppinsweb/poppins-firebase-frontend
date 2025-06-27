import { useState } from "react";
import axios from "axios";

const useSubmitEvaluation = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitEvaluation = async (data) => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {  
     const response = await axios.post(url, data);

     console.log("Response data", response.data);

     return response.data;
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitEvaluation, loading, error };
};

export { useSubmitEvaluation };
