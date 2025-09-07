import React, { useState } from "react";
import axios from "axios";
import "../../styles/users/modal.css";

const ModalToken = ({ onClose, userId, refetchTokens }) => {
  const [newToken, setNewToken] = useState("");
  const [error, setError] = useState("");

  const handleAddToken = async () => {
    try {
      setError("");
      await axios.put(`${import.meta.env.VITE_API_URL}/update-user/${userId}/add-token`,
      { token:newToken}
    );
      await refetchTokens(); // Refresca la lista de tokens
      onClose();
    } catch (err) {
      console.error("Error al agregar token:", err);
      setError("No se pudo agregar el token. Verifique que exista y no esté en uso.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal">
        <h3>Agregar Token</h3>
        <input
          type="text"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value)}
          placeholder="Ingrese token"
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-actions">
          <button className="btn btn-success" onClick={handleAddToken}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalToken;
