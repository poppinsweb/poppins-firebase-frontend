import { useState } from "react";

export const InfoToken = () => {
  const [collapsedSections, setCollapsedSections] = useState([true, true, true]);

  const handleToggleCollapse = (index) => {
    setCollapsedSections((prev) =>
      prev.map((collapsed, i) => (i === index ? !collapsed : collapsed))
    );
  };

  return (
    <div className="infotoken-main-container">
      <div className="btn-token-container">
        {/* Botón 1 */}
        <div className="btn-section">
          <button
            onClick={() => handleToggleCollapse(0)}
            className="btn btn-outline-secondary btn-token-info"
          >
            Instrucciones si aún no diligencia los datos del niño
          </button>
          {!collapsedSections[0] && (
            <div className="btn-info-text">
              <p><strong>PRIMEROS PASOS:</strong></p>
              <ol>
                <li>Elija el TOKEN que tenga disponible</li>
                <li>Presione el botón "Datos del Niño"</li>
                <li>Diligencie todos los datos personales del niño</li>
                <li>
                  Acepte la autorización para el tratamiento de datos personales
                </li>
                <li>
                  Al presionar "Enviar" será redirigido de nuevo a esta página,
                  entonces siga las instrucciones siguientes
                </li>
              </ol>
            </div>
          )}
        </div>
        {/* Botón 2 */}
        <div className="btn-section">
          <button
            onClick={() => handleToggleCollapse(1)}
            className="btn btn-outline-secondary btn-token-info"
          >
            Instrucciones si ya diligenció los datos del niño
          </button>
          {!collapsedSections[1] && (
            <div className="btn-info-text">
              <ol>
                <li>Elija el TOKEN que ya contiene los datos del niño</li>
                <li>
                  Presione el botón "Ir a Encuesta"
                </li>
                <li>
                  Por favor disponga de aproximadamente 20 a 30 minutos para
                  diligenciar todas las preguntas (51 en total)
                </li>
              </ol>
            </div>
          )}
        </div>
        {/* Botón 3 */}
        <div className="btn-section">
          <button
            onClick={() => handleToggleCollapse(2)}
            className="btn btn-outline-secondary btn-token-info"
          >
            Instrucciones para diligenciar encuesta de seguimiento
          </button>
          {!collapsedSections[2] && (
            <div className="btn-info-text">
              <ol>
                <li>
                  Para diligenciar la segunda aplicación de la encuesta,
                  presione el botón "Ir a Encuesta", al finalizar se activarán
                  los resultados de esta
                </li>
                <li>
                  Recuerde que tiene un plazo máximo de 6 meses para esta
                  segunda aplicación de la encuesta
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
