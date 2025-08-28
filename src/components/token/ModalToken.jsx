// src/components/ModalToken.jsx
import React, { useState } from "react";
import axios from "axios";
import "../../styles/users/modal.css";

export const ModalToken = ({ isOpen, onClose, matchedUser, refetchTokens }) => {
  const [newToken, setNewToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null; // 👈 no renderiza si no está abierto

  const handleAddToken = async () => {
    if (!newToken.trim()) return;
    setLoading(true);
    setMessage("");

    try {
      // 1. Validar que el token ya fue comprado
      const tokensRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/tokens`
      );
      const foundToken = tokensRes.data.tokens.find(
        (t) => t.evaluationToken === newToken
      );
      if (!foundToken) {
        setMessage("❌ No se encontró el token.");
        return;
      }

      // 2. Validar que no esté usado por otro usuario
      const usersRes = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const tokenUsed = usersRes.data.some(
        (u) => u.token && u.token.includes(newToken)
      );
      if (tokenUsed) {
        setMessage("❌ El token ya está vinculado a otro usuario.");
        return;
      }

      // 3. Guardar el token asociado al usuario
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${matchedUser._id}`,
        {
          token: [...(matchedUser.token || []), newToken],
        }
      );
        setMessage("✅ Token agregado con éxito.");

      // 4. Resetear estado y cerrar modal
      setNewToken("");
      onClose(); // cerrar modal
      await refetchTokens(); // recargar lista
    } catch (err) {
      console.error("Error al agregar token:", err);
      setMessage("❌ Error al procesar el token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal">
        <h3>Agregar nuevo Token</h3>
        <input
          type="text"
          className="form-control"
          value={newToken}
          placeholder="Nuevo Token"
          onChange={(e) => setNewToken(e.target.value)}
        />
        {message && <p className="error-message">{message}</p>}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={handleAddToken}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};
