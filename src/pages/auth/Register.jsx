import React, { useState } from "react";
import axios from "axios";
import "../../styles/home/login.css"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      password2,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        userData
      );
      console.log(response);
      setMessage("User registered successfully!");
      // Reset form fields
      setEmail("");
      setPassword("");
      setPassword2("");
    } catch (error) {
      setMessage("Failed to register user");
      console.error("Error:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="register-card">
        <h2 className="title-register">Registro de Usuarios</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Nombre de Usuario:</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Repetir Contraseña:</label>
           <input
              className="form-control"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-color btn-login" type="submit">
            Registrarse
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
