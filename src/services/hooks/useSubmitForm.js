import { useState } from "react";
import axios from "axios";

const useSubmitForm = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (data, evaluationtoken) => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {  
     const response = await axios.post(endpoint, {...data, evaluationtoken});
     setLoading(false);
     console.log("Response data", response.data);
     return response.data;
    } catch (err) {
      setLoading(false);
      console.error("Error submitting form:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { submitForm, loading, error };
};

export { useSubmitForm };
