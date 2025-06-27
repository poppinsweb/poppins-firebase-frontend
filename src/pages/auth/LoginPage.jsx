import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "../../styles/home/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const successLogin = await login(email, password);
        setMessage("Login successful");
        setEmail("");
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
            <label>Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
