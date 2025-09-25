import React, { useState, useEffect, useMemo } from "react";
import { useFetchData } from "../../services/hooks/useFetchData";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [sortConfigUsers, setSortConfigUsers] = useState({ key: null, direction: "asc" });
  const [sortConfigTokens, setSortConfigTokens] = useState({ key: null, direction: "asc" });

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/users`);

  const {
    data: tokenData,
    loading: tokenLoading,
    error: tokenError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/tokens`);

  const getUserByToken = (evaluationToken) => {
    return users.find((u) =>
      Array.isArray(u.token)
        ? u.token.includes(evaluationToken)
        : u.token === evaluationToken
    );
  };

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    if (tokenData) {
      setTokens(tokenData.tokens);
    }
  }, [tokenData]);

  // 🔥 Ordenar usuarios
  const sortedUsers = useMemo(() => {
    if (!sortConfigUsers.key) return users;

    return [...users].sort((a, b) => {
      let aValue = a[sortConfigUsers.key];
      let bValue = b[sortConfigUsers.key];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortConfigUsers.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfigUsers.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortConfigUsers]);

  // 🔥 Ordenar tokens
  const sortedTokens = useMemo(() => {
    if (!sortConfigTokens.key) return tokens;

    return [...tokens].sort((a, b) => {
      let aValue;
      let bValue;

      if (sortConfigTokens.key === "usadoPor") {
        const userA = getUserByToken(a.evaluationToken);
        const userB = getUserByToken(b.evaluationToken);
        aValue = userA ? userA.email || userA.userName : "";
        bValue = userB ? userB.email || userB.userName : "";
      } else {
        aValue = a[sortConfigTokens.key];
        bValue = b[sortConfigTokens.key];
      }

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortConfigTokens.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfigTokens.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tokens, sortConfigTokens, users]);

  // 🔥 Handlers
  const handleSortUsers = (key) => {
    setSortConfigUsers((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleSortTokens = (key) => {
    setSortConfigTokens((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // 🔥 Función para renderizar flechas
  const renderArrow = (config, key) => {
    if (config.key !== key) return "▲▼"; // siempre visibles pero grises si no está activa
    return config.direction === "asc" ? "▲" : "▼";
  };

  if (usersLoading || tokenLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading user data: {usersError.message}</p>;
  if (tokenError) return <p>Error loading token data: {tokenError.message}</p>;
  return (
    <>
      <div>
        <h2>USUARIOS</h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSortUsers("email")} style={{ cursor: "pointer" }}>
                Nombre de Usuario {renderArrow(sortConfigUsers, "email")}
              </th>
              <th onClick={() => handleSortUsers("admin")} style={{ cursor: "pointer" }}>
                Admin {renderArrow(sortConfigUsers, "admin")}
              </th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.email || user.userName}</td>
                <td>{user.admin.toString()}</td>
                <td>
                  {Array.isArray(user.token) ? (
                    user.token.map((t, index) => (
                      <span key={index} className="badge bg-secondary me-2">
                        {t}
                      </span>
                    ))
                  ) : user.token ? (
                    <span className="badge bg-secondary">{user.token}</span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>TOKENS</h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSortTokens("evaluationToken")} style={{ cursor: "pointer" }}>
                Token {renderArrow(sortConfigTokens, "evaluationToken")}
              </th>
              <th onClick={() => handleSortTokens("email")} style={{ cursor: "pointer" }}>
                Email con el que se compró el Token {renderArrow(sortConfigTokens, "email")}
              </th>
              <th onClick={() => handleSortTokens("usadoPor")} style={{ cursor: "pointer" }}>
                Usado por {renderArrow(sortConfigTokens, "usadoPor")}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sortedTokens) &&
              sortedTokens.map((token) => {
                const user = getUserByToken(token.evaluationToken);
                return (
                  <tr key={token._id}>
                    <td>{token.evaluationToken}</td>
                    <td>{token.email}</td>
                    <td>{user ? user.email || user.userName : "No usado"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
