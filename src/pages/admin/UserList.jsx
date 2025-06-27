import React, { useState, useEffect } from 'react';
import { useFetchData } from '../../services/hooks/useFetchData';

const UserList = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useFetchData(`${import.meta.env.VITE_API_URL}/api/users`);
  const { data: childrenData, loading: childrenLoading, error: childrenError } = useFetchData(`${import.meta.env.VITE_API_URL}/api/childrenres`);

  const [users, setUsers] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    if (childrenData) {
      setChildren(childrenData);
    }
  }, [childrenData]);

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/delete-user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error eliminando usuario');
      }

      // Eliminar usuario de la lista local
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteChild = async (childId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este niño?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/delete-child/${childId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error eliminando niño');
      }

      // Eliminar niño de la lista local
      setChildren((prevChildren) => prevChildren.filter(child => child._id !== childId));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (usersLoading || childrenLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading user data: {usersError.message}</p>;
  if (childrenError) return <p>Error loading children data: {childrenError.message}</p>;

  return (
    <>
      <div>
        <h2>USUARIOS</h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Token</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.evaluationtoken}</td>
                <td>{user.email}</td>
                <td>{user.admin.toString()}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Niños</h2>
      {children.length > 0 ? (
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{child._id}</td>
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
    </>
  );
};

export default UserList;
