import React, { useState, useEffect } from "react";
import { useFetchData } from "../../services/hooks/useFetchData";

const UserList = () => {
  const [users, setUsers] = useState([]);
  // const [children, setChildren] = useState([]);
  const [tokens, setTokens] = useState([]);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/users`);

  // const {
  //   data: childrenData,
  //   loading: childrenLoading,
  //   error: childrenError,
  // } = useFetchData(`${import.meta.env.VITE_API_URL}/childrenres`);

  const {
    data: tokenData,
    loading: tokenLoading,
    error: tokenError,
  } = useFetchData(`${import.meta.env.VITE_API_URL}/tokens`);

  // Obtiene el usuario asociado a un token específico
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
      // console.log(usersData);
    }
  }, [usersData]);

  // useEffect(() => {
  //   if (childrenData) {
  //     setChildren(childrenData);
  //   }
  // }, [childrenData]);

  useEffect(() => {
    if (tokenData) {
      setTokens(tokenData.tokens);
    }
    // console.log(tokenData);
  }, [tokenData]);

  // const formatUserTokens = (tokens) => {
  //   if (!tokens) return "No tiene tokens";
  //   if (Array.isArray (tokens)) return tokens.join(", ");
  //   return tokens;
  // };

  // BORRAR USUARIO. LO COMENTO PROVISIONALMENTE
  // const handleDeleteUser = async (userId) => {
  //   const confirmed = window.confirm(
  //     "¿Estás seguro de que deseas eliminar este usuario?"
  //   );
  //   if (!confirmed) return;

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/delete-user/${userId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Error eliminando usuario");
  //     }

  //     // Eliminar usuario de la lista local
  //     setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // LISTA DE NIÑOS. LO COMENTO PROVISIONALMENTE
  // const handleDeleteChild = async (childId) => {
  //   const confirmed = window.confirm(
  //     "¿Estás seguro de que deseas eliminar este niño?"
  //   );
  //   if (!confirmed) return;

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/delete-child/${childId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Error eliminando niño");
  //     }

  //     // Eliminar niño de la lista local
  //     setChildren((prevChildren) =>
  //       prevChildren.filter((child) => child._id !== childId)
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  if (usersLoading || tokenLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading user data: {usersError.message}</p>;
  // if (childrenError)
  //   return <p>Error loading children data: {childrenError.message}</p>;
  if (tokenError) return <p>Error loading token data: {tokenError.message}</p>;

  return (
    <>
      <div>
        <h2>USUARIOS</h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Admin</th>
              <th>Tokens</th>
              {/* <th>Eliminar</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email || user.userName}</td>
                <td>{user.admin.toString()}</td>
                <td>
                  {Array.isArray(user.token) ? (
                    user.token.map((t, index) => (
                      <span key={index} className="badge bg-primary me-2">
                        {t}
                      </span>
                    ))
                  ) : user.token ? (
                    <span className="badge bg-secondary">{user.token}</span>
                  ) : (
                    "—"
                  )}
                </td>
                {/* <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Borrar
                  </button>
                </td> */}
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
              <th>Token</th>
              <th>Email con el que se compró el Token</th>
              <th>Usado por</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tokens) &&
              tokens.map((token) => {
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
      {/* <div>
        <h2>NIÑOS</h2>
        {children.length > 0 ? (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Token</th>
                <th>NOMBRES</th>
                <th>APELLIDOS</th>
                <th>SEXO</th>
                <th>GRADO</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child._id}>
                  <td>{child.evaluationtoken}</td>
                  <td>{child.firstName}</td>
                  <td>{child.lastName}</td>
                  <td>{child.responses[0].value}</td>
                  <td>{child.responses[3].value}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteChild(child._id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No hay Niños"
        )}
      </div> */}
    </>
  );
};

export default UserList;
