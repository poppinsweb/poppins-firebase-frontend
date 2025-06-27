import { useState } from "react";

export const InfoCard = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="infotoken-main-container">
      <div className="btn-info-container-card">
        <button
          onClick={handleToggleCollapse}
          className="btn btn-outline-secondary btn-token-navigation"
        >
          Instrucciones. Leer Antes de Iniciar
        </button>
        {collapsed ? null : (
          <>
            <div className="btn-info-text-card">
              <p>
                A continuación, va a encontrar 51 preguntas sobre las
                actividades de baño, vestido, alimentación, sueño y organización
                que deben ser diligenciadas por un adulto que comparta
                frecuentemente las actividades de rutina con el niño. Busque la
                opción que se acerque más a la realidad que vive a diario con el
                niño. Tómese el tiempo de leer varias veces las preguntas, pues
                pueden verse parecidas en una lectura rápida. Requiere de unos
                15 minutos para su diligenciamiento.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
