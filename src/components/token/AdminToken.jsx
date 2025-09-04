import React, { useState } from "react";
import axios from "axios";
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
  const [createdTokens, setCreatedTokens] = useState([]);

  // Crea los tokens desde Admin
  const handleCreate = async (email, userId, numTokens) => {
    try {
      const newTokens = [];
      for (let i = 0; i < numTokens; i++) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-token`,
          {
            email,
            userId,
          }
        );
        newTokens.push(res.data.token);
      }
      setCreatedTokens((prev) => [...prev, ...newTokens]);
      fetchEvaluTokens();
    } catch (err) {
      console.error("Error:", err);
      setLocalError(err.response?.data?.message || err.message);
    }
  };

  // Elimina tokens
  const handleDelete = async (tokenId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este token?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-token/${tokenId}`
      );
      fetchEvaluTokens();
    } catch (err) {
      console.error("Error:", err);
      setLocalError(err.response?.data?.message || err.message);
    }
  };

  const handleNumTokensChange = (userId, numTokens) => {
    setNumTokensMap((prevMap) => ({ ...prevMap, [userId]: numTokens }));
  };

  if (loading || usersLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tokens data: {error}</p>;
  if (usersError) return <p>Error loading users data: {usersError.message}</p>;
  if (localError) return <p>Error: {localError}</p>;

  const sortedUsers = usersData.sort((a, b) =>
    (a.userName || a.email).localeCompare(b.userName || b.email)
  );

  return (
    <div className="admin-token-main-container">
      <h2>MANEJO DE TOKENS</h2>
      <table className="table table-hover table-striped custom-table">
        <thead>
          <tr>
            <th>Email</th>
            <th className="num">Número de Tokens</th>
            <th>Crear Token</th>
            <th>Eliminar Token (click)</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user._id}>
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
          ))}
        </tbody>
      </table>
      {createdTokens.length > 0 && (
        <div className="mt-4">
          <h4>Últimos Tokens Creados</h4>
          <ul>
            {createdTokens.map((tk, index) => (
              <li key={index}>
                <span className="">{tk.evaluationToken}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
