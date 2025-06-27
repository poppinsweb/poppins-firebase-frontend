import "../../styles/home/footer.css";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="container footer-container footer-container-login">
      <footer className="text-center">
        <div className="container">
          <section className="mt-1 footer-links">
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/">Inicio</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/construction">Contactanos</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/construction">Aviso Legal</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/privacity">Privacidad</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/construction">Copyright</a>
              </div>
            </div>
            <div className="row text-center d-flex justify-content-center pt-3">
              <div className="col-md-12">
                <a href="/construction">Sobre Nosotros</a>
              </div>
            </div>
          </section>
          <section className="social-logos">
            <a href="https://www.instagram.com/poppinseduca/" target="_blank" rel="noopener noreferrer">
              <FaInstagram alt="Link-instagram" className="social" />
            </a>
            <a href="https://wa.me/c/573028464049" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp alt="Link-whatsapp" className="social"/>  
            </a>
          </section>
        </div>
      </footer>
    </div>
  );
};
