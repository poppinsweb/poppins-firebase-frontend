import "../../styles/home/home.css";
import umbrellafirst from "../../styles/images/UmbrellaFirst.jpg";
import { FaRegCopyright } from "react-icons/fa";
import { Footer } from "./Footer";

export function Home() {
  return (
    <>
      <div className="container">
        <section className="logo-container">
          <img src={umbrellafirst} className="logo" alt="umbrella-logo" />
        </section>

        <section className="info-encuesta-container text-block">
          <h2 className="centered-title">
            <strong>Información Sobre la Encuesta</strong> <br />
          </h2>
          La Encuesta de Hábitos e Independencia en la Rutina Diaria
          <FaRegCopyright
            style={{ fontSize: 10, marginLeft: -7, marginBottom: 5 }}
          />
          se aplica con niños entre los 4 y 8 años y está deseñada para
          identificar tres aspectos:
          <ol>
            <li className="list-item">
              Independencia en actividades de baño, vestido, alimentación y
              sueño.
            </li>
            <li className="list-item">
              Nivel de habilidad alcanzado en actividades básicas de la vida
              diaria.
            </li>
            <li className="list-item">
              Nivel de interiorización de hábitos y rutinas básicas.
            </li>
          </ol>
          <p>
            Para diligenciar la Encuesta debe adquirir un TOKEN
            <a
              href="https://www.poppinseduca.com/product-page/encuesta"
              target="_blank"
              className="link-buy"
            >
              AQUÍ
            </a>
            que le permitirá hacer una evaluación inicial, y una de seguimiento,
            en un tiempo máximo de 6 meses. Si es la primera vez que diligencia
            la encuesta, y ya adquirió el TOKEN, debe registrarse:
            <a href="/register" className="link-buy">
              AQUÍ
            </a>
          </p>
          <p>
            Duración de la Encuesta: aproximadamente 10 minutos. Tenga en cuenta
            que no debe cerrar la sesión hasta que finalice la encuesta, ya que
            de lo contrario se perderá el progreso.
          </p>
          <p>
            Recomendación: La encuesta debe ser diligenciada por un adulto que
            comparta con el niño la realización de las actividades de la vida
            diaria.
          </p>
          <p>
            Importante: La encuesta está protegida por derechos de autor y no se
            permite su reproducción total o parcial sin permiso expreso del
            autor.
          </p>
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </>
  );
}
