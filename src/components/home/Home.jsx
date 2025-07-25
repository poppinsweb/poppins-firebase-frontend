import "../../styles/home/home.css";
import umbrellafirst from "../../styles/images/UmbrellaFirst.jpg";

export function Home() {
  return (
    <div className="container">
      <section className="logo-container">
        <img src={umbrellafirst} className="logo" alt="umbrella-logo" />
      </section>

      <section className="info-encuesta-container text-block">
        {" "}
        <h2 className="centered-title">
          <strong>Información Sobre la Encuesta</strong> <br />
        </h2>
        La Encuesta de Hábitos e Independencia en la Rutina Diaria se aplica con
        niños entre los 4 y 8 años y está deseñada para identificar tres
        aspectos:
        <p className="list">
          <ol>
            <li className="list-item">
              Independencia en actividades de baño, vestido, alimentación y
              sueño
            </li>
            <li className="list-item">
              nivel de habilidad alcanzado en actividades básicas de la vida
              diaria
            </li>
            <li className="list-item">
              Nivel de interiorización de hábitos y rutinas básicas.
            </li>
          </ol>
        </p>
        <p>
          Para diligenciar la Encuesta debe adquirir un TOKEN que le permitirá
          hacer una evaluación inicial y una de seguimiento en un tiempo máximo
          de 6 meses.
        </p>
        Duración de la Encuesta: aproximadamente 10 minutos .
      </section>
    </div>
  );
}
