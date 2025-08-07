import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "../../styles/home/login.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const successLogin = await login(userName, password);
        setMessage("Login successful");
        setUserName("");
        setPassword("");
        navigate('/token')
    } catch (error) {
      setMessage("Failed to login");
      console.error("Error:", error);
    }
  };
  return (
    <div className="page-container">
      <div className="login-card">
        <h2 className="title-login">Ingreso de Usuario</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-color btn-login">
            Ingresar
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
