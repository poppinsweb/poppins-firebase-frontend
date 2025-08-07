import React, { useState } from "react";
import { useEvaluationToken } from "../../context/EvaluationTokenProvider";
import { useFetchData } from "../../services/hooks/useFetchData";

export const AdminToken = () => {
  const { evaluTokens, error, loading, fetchEvaluTokens } =
    useEvaluationToken();
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/users`);
  const [localError, setLocalError] = useState(null);
  const [numTokensMap, setNumTokensMap] = useState({});

  const handleCreate = async (email, userId, numTokens) => {
    try {
      for (let i = 0; i < numTokens; i++) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/create-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, userId }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error creating token");
        }
      }
      fetchEvaluTokens();
    } catch (err) {
      console.log("Error:", err);
      setLocalError(err.message);
    }
  };

  const handleDelete = async (tokenId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete-token/${tokenId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error deleting token");
      }

      fetchEvaluTokens();
    } catch (err) {
      console.error("Error:", err);
      setLocalError(err.message);
    }
  };

  const handleNumTokensChange = (userId, numTokens) => {
    setNumTokensMap((prevMap) => ({ ...prevMap, [userId]: numTokens }));
  };

  if (loading || usersLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tokens data: {error}</p>;
  if (usersError) return <p>Error loading users data: {usersError.message}</p>;
  if (localError) return <p>Error: {localError}</p>;

  const sortedUsers = usersData.sort((a, b) => a.userName || a.email.localeCompare(b.userName || b.email));

  return (
    <div className="admin-token-main-container">
      <h2>TOKENS</h2>
      <table className="table table-hover table-striped custom-table">
        <thead>
          <tr>
            <th>Email</th>
            <th className="num">Número de Tokens</th>
            <th>Crear Token</th>
            <th>Eliminar Token (click) </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <React.Fragment key={user._id}>
              <tr>
                <td>{user.userName || user.email}</td>
                <td>
                  <input
                    type="number"
                    value={numTokensMap[user._id] || 1}
                    onChange={(e) =>
                      handleNumTokensChange(user._id, Number(e.target.value))
                    }
                    min="1"
                    className="form-control num"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={() =>
                      handleCreate(
                        user.userName || user.email,
                        user._id,
                        numTokensMap[user._id] || 1
                      )
                    }
                  >
                    Crear
                  </button>
                </td>
                <td>
                  {evaluTokens
                    .filter((token) => token.userId === user._id)
                    .map((token) => (
                      <button
                        key={token._id}
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(token._id)}
                      >
                        {token.evaluationToken}
                      </button>
                    ))}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
