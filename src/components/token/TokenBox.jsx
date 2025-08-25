import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../services/hooks/useFetchData";
import "../../styles/users/token.css";

export const TokenBox = () => {
  const [selectedToken, setSelectedToken] = useState("");
  const [tokenUsageCount, setTokenUsageCount] = useState(0);
  const [selectedChild, setSelectedChild] = useState(null);
  const { user } = useAuth();
  const {
    data: tokensData,
    loading: tokensLoading,
    error: tokensError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/tokens`);

  const {
    data: evaluationsData,
    loading: evaluationsLoading,
    error: evaluationsError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/completevaluations`);

  const { data: usersData, loading: usersLoading } = useFetchData(
    `${import.meta.env.VITE_API_URL}/users`
  );

  const { data: childData } = useFetchData(
    `${import.meta.env.VITE_API_URL}/childrenres`
  );

  const navigate = useNavigate();

  console.log("usersData:", usersData);
  // console.log("user:", user);

  useEffect(() => {
    if (selectedToken) {
      // Filtrar el token seleccionado
      const selectedTokenData = tokensData?.tokens.find(
        (token) => token.evaluationToken === selectedToken
      );

      if (selectedTokenData) {
        setTokenUsageCount(selectedTokenData.usageCount);
      }
    }
  }, [selectedToken, tokensData, evaluationsData]);

  // Verifica si el user.id existe en el usersData
  const matchedUser = usersData?.find((u) => u._id === user.id);

  // Cruce de datos con evaluationToken
  const userEvaluationTokens = matchedUser && tokensData?.tokens
    ?tokensData.tokens.filter((token) =>
    token.evaluationToken === matchedUser.token
    )
  :[];

  useEffect(() => {
    if (selectedToken && childData) {
      const associatedChild = childData?.find(
        (child) => child.evaluationtoken === selectedToken
      );
      if (associatedChild) {
        setSelectedChild(associatedChild);
      } else {
        setSelectedChild(null);
      }
    }
  }, [selectedToken, childData]);

  if (tokensLoading || evaluationsLoading || usersLoading)
    return <p>Loading...</p>;
  if (tokensError)
    return <p>Error loading tokens data: {tokensError.message}</p>;
  if (evaluationsError)
    return <p>Error loading evaluations data: {evaluationsError.message}</p>;

  const handleTokenChange = (event) => {
    const newToken = event.target.value;
    setSelectedToken(newToken);
  };

  const handleNavigatePersonales = () => {
    navigate("/personales", { state: { evaluationtoken: selectedToken } });
  };

  const handleNavigateResult = () => {
    navigate("/resultados", { state: { evaluationtoken: selectedToken } });
  };

  const handleNavigateEvaluation = () => {
    navigate("/encuesta", { state: { evaluationtoken: selectedToken } });
  };

  const isInitialEvaluationDisabled =
    !selectedToken || !selectedChild || tokenUsageCount >= 2;
  const isFinalEvaluationDisabled = !selectedToken || tokenUsageCount <= 1;
  const isResultDisabled = !selectedToken || tokenUsageCount < 1;

  const isDataChildButtonDissabled =
    !selectedToken ||
    tokenUsageCount >= 1 ||
    (selectedChild && selectedChild.responses);

  const getTokenAlias = (token) => {
    const child = childData?.find((child) => child.evaluationtoken === token);
    return child ? `${child.firstName} ${child.lastName}` : token;
  };

  return (
    <>
      <div className="box-tokens-container">
        {/* <div>
          <input type="text" placeholder="Token alfanumérico" className="add-token" />{" "}
          <button className="add-token-btn">Agregar</button>
        </div> */}

        {!matchedUser ? (
          <p>Usuario no válido</p>
        ) : userEvaluationTokens.length === 0 ? (
          <p>No tiene tokens disponibles</p>
        ) : (
          <>
            <p className="text-token">
              **** HAGA CLICK SOBRE EL TOKEN QUE VA A UTILIZAR ****
            </p>
            <h2 className="code-title">Token</h2>
            <div className="radio-token-container">
              {userEvaluationTokens.map((token, index) => (
                <label key={index} className="token-label">
                  <input
                    className="radio-token"
                    type="radio"
                    name="token"
                    value={token.evaluationToken}
                    checked={selectedToken === token.evaluationToken}
                    onChange={handleTokenChange}
                  />
                  {getTokenAlias(token.evaluationToken)}
                </label>
              ))}
              <div className="btn-token">
                <button
                  className="btn btn-color"
                  onClick={handleNavigatePersonales}
                  disabled={isDataChildButtonDissabled}
                >
                  Datos del Niño
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="navitoken-main-container">
        <div className="btn-token-container">
          <button
            className="btn btn-outline-secondary btn-token-navigation"
            onClick={handleNavigateEvaluation}
            disabled={isInitialEvaluationDisabled}
          >
            {isResultDisabled ? "Ir a Encuesta" : "Encuesta de seguimiento"}
          </button>
        </div>
        <div className="btn-token-container">
          <button
            className="btn btn-outline-secondary btn-token-navigation"
            disabled={isResultDisabled}
            onClick={handleNavigateResult}
          >
            Resultados primera aplicación
          </button>
        </div>
        <div className="btn-token-container">
          <button
            className="btn btn-outline-secondary btn-token-navigation"
            onClick={handleNavigateResult}
            disabled={isFinalEvaluationDisabled}
          >
            Resultados segunda aplicación
          </button>
        </div>
      </div>
    </>
  );
};
