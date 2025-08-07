import React, { useState } from "react";
import axios from "axios";
import "../../styles/home/login.css"

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // VALIDA QUE EL TOKEN YA FUE COMPRADO
    try {
      const evalTokenRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/evaluationtokens/${evaluationToken}`
      );
      if (!evalTokenRes.data) {
        setMessage("El token no existe.");
        return;
      }
    } catch {
      setMessage("El token no existe.");
      return;
    }

    // VALIDA QUE EL TOKEN NO HAYA SIDO USADO POR OTRO USUARIO
    try {
      const usersRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`
      );
      const tokenUsed = usersRes.data.some(
        (user) => user.tokens && user.tokens.includes(token)
      );
      if (tokenUsed) {
        setMessage("El token ya está vinculado a otro usuario.");
        return;
      }
    } catch {
      setMessage("Error al validar el token.");
      return;
    }

    // REGISTRA AL USUARIO Y ASOCIA EL TOKEN
    const userData = {
      userName,
      password,
      password2,
      token,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        userData
      );
      console.log("respuesta:", response);
      setMessage("Usuario registrado con éxito!");
      // Reset form fields
      setUserName("");
      setPassword("");
      setPassword2("");
      setToken("");
    } catch (error) {
      setMessage("No se pudo registrar el usuario.");
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
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
          <div>
            <label>Ingrese un token*:</label>
           <input
              className="form-control add-token"
              type="text"
              placeholder=""
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-color btn-login" type="submit">
            Registrarse
          </button>
        </form>
        {message && <p>{message}</p>} <br />
        <p>*Puede adquirir sus tokens <a href="#">aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
